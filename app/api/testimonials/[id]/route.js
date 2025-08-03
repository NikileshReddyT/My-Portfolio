import { NextResponse } from 'next/server';
import { pool, initTestimonialsTable } from '../../../../lib/db';

async function initialize() {
  try {
    await initTestimonialsTable();
  } catch (err) {
    console.error('Failed to initialize testimonials table:', err);
  }
}

initialize();

// Get a single testimonial by ID
export async function GET(request, { params }) {
  const { id } = params;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM testimonials WHERE id = $1', [id]);
    client.release();
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Update a testimonial's status or content
export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const { name, company, message, approved } = await request.json();

    const client = await pool.connect();
    const query = `
      UPDATE testimonials
      SET 
        name = COALESCE($1, name),
        company = COALESCE($2, company),
        message = COALESCE($3, message),
        approved = COALESCE($4, approved)
      WHERE id = $5
      RETURNING *;
    `;
    const values = [name, company, message, approved, id];
    const result = await client.query(query, values);
    client.release();

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error(`Error updating testimonial ${id}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Delete a testimonial
export async function DELETE(request, { params }) {
  const { id } = params;
  try {
    const client = await pool.connect();
    const result = await client.query('DELETE FROM testimonials WHERE id = $1 RETURNING *', [id]);
    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error(`Error deleting testimonial ${id}:`, error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
