import { NextResponse } from 'next/server';
import { 
  addTestimonial, 
  getApprovedTestimonials,
  getPendingTestimonials,
  getAllTestimonials,
  approveTestimonial
} from '../../lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');

  try {
    let testimonials;
    if (status === 'pending') {
      testimonials = await getPendingTestimonials();
    } else if (status === 'approved') {
      testimonials = await getApprovedTestimonials();
    } else {
      testimonials = await getAllTestimonials(); // Default to all if no status or invalid status
    }
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: 'Testimonial ID is required' }, { status: 400 });
    }

    const approvedTestimonial = await approveTestimonial(id);

    if (!approvedTestimonial) {
      return NextResponse.json({ error: 'Testimonial not found or could not be approved' }, { status: 404 });
    }

    return NextResponse.json(approvedTestimonial);
  } catch (error) {
    console.error('API Error: Failed to approve testimonial.', error);
    return NextResponse.json(
      { error: 'An internal server error occurred. Please try again later.' }, 
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // The form sends 'message', not 'content'. Let's match the payload.
    const { name, message, company } = await request.json();
    
    // Validate required fields
    if (!name || !message) {
      return NextResponse.json(
        { error: 'Name and message are required fields.' },
        { status: 400 }
      );
    }

    // Pass the correct variables to the database function.
    const newTestimonial = await addTestimonial(name, message, company);
    
    // The addTestimonial function returns the full new row from the DB.
    // We can return this directly to the client so it can be added to the UI.
    return NextResponse.json(newTestimonial, { status: 201 });
    
  } catch (error) {
    console.error('API Error: Failed to submit testimonial.', error);
    return NextResponse.json(
      { error: 'An internal server error occurred. Please try again later.' }, 
      { status: 500 }
    );
  }
}
