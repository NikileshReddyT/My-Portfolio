import { NextResponse } from 'next/server';
import { pool, initBlogsTable } from '../../../../lib/db';

// Initialize the blogs table if it doesn't exist
async function initialize() {
  try {
    await initBlogsTable();
  } catch (err) {
    console.error('Failed to initialize blogs table:', err);
  }
}

initialize();

// GET a single blog post by ID
export async function GET(request, { params }) {
  const { id } = params;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM blog_posts WHERE id = $1', [id]);
    client.release();
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(`Error fetching blog post ${id}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT (update) a blog post by ID
export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const { title, content, published, tags } = await request.json();
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const client = await pool.connect();
    const query = `
      UPDATE blog_posts
      SET title = $1, slug = $2, content = $3, published = $4, tags = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *;
    `;
    const values = [title, slug, content, published, tags, id];
    const result = await client.query(query, values);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(`Error updating blog post ${id}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE a blog post by ID
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM blog_posts WHERE id = $1 RETURNING *', [id]);
    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error(`Error deleting blog post ${id}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
