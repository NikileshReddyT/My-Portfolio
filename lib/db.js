import { Pool } from 'pg';

const poolConfig = {
  connectionString: process.env.DATABASE_URL, // User should add &connect_timeout=20 to .env
  ssl: { rejectUnauthorized: false },
  max: 5,
  keepAlive: true,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 30000, // Increased timeout to 30s
};

// Use global singleton for Next.js hot reload safety
const globalWithPg = global;
if (!globalWithPg._pgPool) {
  globalWithPg._pgPool = new Pool(poolConfig);
  globalWithPg._pgPool.on('error', err => {
    console.error('Unexpected idle client error', err);
  });
}
export const pool = globalWithPg._pgPool;

// Retry logic for initial connection
async function connectWithRetry(retries = 5, wait = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      const client = await pool.connect();
      await client.query('SELECT 1'); // Warm-up ping
      client.release();
      console.log('Database connected successfully.');
      return;
    } catch (err) {
      if (err.code === 'ETIMEDOUT' || err.message.match(/terminated due to connection timeout/)) {
        console.warn(`DB connect attempt ${i + 1} failed (${err.message}), retrying in ${wait}ms…`);
        await new Promise(r => setTimeout(r, wait));
      } else {
        throw err;
      }
    }
  }
  throw new Error('All attempts to connect to Neon database failed');
}

// Function to get a client from the pool. This ensures that we release the client after each query.
export const getClient = () => pool.connect();

// Testimonials CRUD
export const initTestimonialsTable = async () => {
  const client = await getClient();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS testimonials (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        company VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        approved BOOLEAN DEFAULT FALSE
      );
    `);
    console.log('Testimonials table initialized successfully.');
  } catch (error) {
    console.error('Error initializing testimonials table:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const addTestimonial = async (name, message, company) => {
  const client = await getClient();
  try {
    const query = `
      INSERT INTO testimonials (name, message, company)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [name, message, company];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error adding testimonial:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Blogs CRUD
export const initBlogsTable = async () => {
  const client = await getClient();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        tags TEXT[],
        status VARCHAR(50) DEFAULT 'draft',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Blogs table initialized successfully.');
  } catch (error) {
    console.error('Error initializing blogs table:', error);
    throw error;
  } finally {
    client.release();
  }
};

const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word chars
    .replace(/\s+/g, '-')       // replace spaces with hyphens
    .replace(/--+/g, '-');      // remove consecutive hyphens
};

export const addBlogPost = async (post) => {
  const { title, excerpt, content, tags, status } = post;
  const slug = generateSlug(title);

  const client = await getClient();
  try {
    await initBlogsTable(); // Ensure table exists
    const query = `
      INSERT INTO blogs (title, slug, excerpt, content, tags, status)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [title, slug, excerpt, content, tags, status];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    if (error.code === '23505') { // Unique violation for slug
      throw new Error('A blog post with this title already exists.');
    }
    console.error('Error adding blog post:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const getApprovedTestimonials = async () => {
  const client = await getClient();
  try {
    const result = await client.query('SELECT * FROM testimonials WHERE approved = TRUE ORDER BY created_at DESC');
    return result.rows;
  } catch (error) {
    console.error('Error fetching approved testimonials:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const getAllTestimonials = async () => {
  const client = await getClient();
  try {
    const result = await client.query('SELECT * FROM testimonials ORDER BY created_at DESC');
    return result.rows;
  } catch (error) {
    console.error('Error fetching all testimonials:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const getPendingTestimonials = async () => {
  const client = await getClient();
  try {
    const result = await client.query('SELECT * FROM testimonials WHERE approved = FALSE ORDER BY created_at ASC');
    return result.rows;
  } catch (error) {
    console.error('Error fetching pending testimonials:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const approveTestimonial = async (id) => {
  const client = await getClient();
  try {
    const result = await client.query('UPDATE testimonials SET approved = TRUE WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error approving testimonial:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const updateTestimonial = async (id, name, message, company) => {
  const client = await getClient();
  try {
    const query = `
      UPDATE testimonials
      SET name = $1, message = $2, company = $3
      WHERE id = $4
      RETURNING *;
    `;
    const values = [name, message, company, id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating testimonial:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const deleteTestimonial = async (id) => {
  const client = await getClient();
  try {
    const result = await client.query('DELETE FROM testimonials WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    throw error;
  } finally {
    client.release();
  }
};


export const getAllBlogPosts = async () => {
  const client = await getClient();
  try {
    const result = await client.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
    return result.rows;
  } catch (error) {
    console.error('Error fetching all blog posts:', error);
    throw error;
  } finally {
    client.release();
  }
};

export const updateBlogPost = async (id, title, slug, content, published) => {
  const client = await getClient();
  try {
    const query = `
      UPDATE blog_posts
      SET title = $1, slug = $2, content = $3, published = $4
      WHERE id = $5
      RETURNING *;
    `;
    const values = [title, slug, content, published, id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  } finally {
    client.release();
  }
};




