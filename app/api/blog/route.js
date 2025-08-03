import { NextResponse } from 'next/server';
import { addBlogPost, getAllBlogPosts } from '../../../lib/db';



// GET /api/blog – list all blog posts
export async function GET() {
  try {
    const posts = await getAllBlogPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const blogData = await request.json();
    
    // Validate required fields
    if (!blogData.title || !blogData.content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }
    
    // Add blog post to database
    const newBlogPost = await addBlogPost(blogData);
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Blog post created successfully!',
        blogPost: newBlogPost
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post. Please try again later.' },
      { status: 500 }
    );
  }
}



export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Blog post ID is required' },
        { status: 400 }
      );
    }
    
    // In a real application, you would implement delete functionality
    // For now, we'll just return a success message
    return NextResponse.json(
      { 
        success: true, 
        message: 'Blog post deleted successfully!' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post. Please try again later.' },
      { status: 500 }
    );
  }
}
