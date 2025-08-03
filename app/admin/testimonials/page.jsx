"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle, FaCheck, FaTimes, FaSearch, FaEdit, FaTrash, FaQuoteLeft, FaSpinner } from 'react-icons/fa';

// Main Admin Component
export default function AdminTestimonials() {
  const [pendingTestimonials, setPendingTestimonials] = useState([]);
  const [allTestimonials, setAllTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionStates, setActionStates] = useState({}); // For approve/reject loading
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      window.location.href = '/admin/login';
    } else {
      fetchTestimonials();
    }
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const [pendingRes, allRes] = await Promise.all([
        fetch('/api/testimonials?status=pending'),
        fetch('/api/testimonials'),
      ]);
      const pendingData = await pendingRes.json();
      const allData = await allRes.json();

      if (pendingRes.ok) setPendingTestimonials(pendingData);
      if (allRes.ok) setAllTestimonials(allData);

    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    setActionStates(prev => ({ ...prev, [id]: true }));
    try {
      let response;
      if (action === 'approve') {
        response = await fetch(`/api/testimonials`, { 
          method: 'PATCH', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
      } else if (action === 'delete') {
        if (!confirm('Are you sure you want to delete this testimonial? This action cannot be undone.')) {
          setActionStates(prev => ({ ...prev, [id]: false }));
          return;
        }
        response = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      }
      
      if (response.ok) {
        fetchTestimonials();
      } else {
        const data = await response.json();
        console.error(`Error ${action}ing testimonial:`, data.error);
      }
    } catch (error) {
      console.error(`Error ${action}ing testimonial:`, error);
    } finally {
      setActionStates(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setIsEditModalOpen(true);
  };

  const handleUpdateTestimonial = async (e) => {
    e.preventDefault();
    if (!editingTestimonial) return;
    setActionStates(prev => ({ ...prev, [editingTestimonial.id]: 'updating' }));
    try {
      const response = await fetch(`/api/testimonials/${editingTestimonial.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTestimonial),
      });

      if (response.ok) {
        setIsEditModalOpen(false);
        fetchTestimonials();
      } else {
        console.error('Failed to update testimonial');
      }
    } catch (error) {
      console.error('Error updating testimonial:', error);
    } finally {
      setActionStates(prev => ({ ...prev, [editingTestimonial.id]: false }));
      setEditingTestimonial(null);
    }
  };

  const filteredPending = pendingTestimonials.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredAll = allTestimonials.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background-color)] flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-[var(--neon-color)]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-color)] text-[var(--text-color)] font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[var(--neon-color)] tracking-tighter"
        >
          Testimonial Management
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 max-w-md mx-auto">
          <div className="relative">
            <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-[var(--card-bg)] border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-color)] transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <AdminSection title="Pending Approval" testimonials={filteredPending} actionStates={actionStates} handleAction={handleAction} />
          <AdminSection title="All Testimonials" testimonials={filteredAll} actionStates={actionStates} handleAction={handleAction} handleEdit={handleEdit} isAllTestimonials />
        </div>

        <motion.div 
          className="mt-8 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p>Total testimonials: {allTestimonials.length} | Pending: {pendingTestimonials.length}</p>
        </motion.div>
      </main>

      <AnimatePresence>
        {isEditModalOpen && (
          <EditModal 
            testimonial={editingTestimonial}
            setTestimonial={setEditingTestimonial}
            onClose={() => setIsEditModalOpen(false)}
            onSubmit={handleUpdateTestimonial}
            isSubmitting={actionStates[editingTestimonial?.id] === 'updating'}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Section Component
const AdminSection = ({ title, testimonials, ...props }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[var(--card-bg)]/50 border border-white/10 rounded-2xl">
    <div className="p-6 border-b border-white/10">
      <h2 className="text-2xl font-bold text-white">{title} <span className="text-base font-normal text-gray-400">({testimonials.length})</span></h2>
    </div>
    <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
      {testimonials.length > 0 ? (
        testimonials.map(t => <TestimonialCardAdmin key={t.id} testimonial={t} {...props} />)
      ) : (
        <p className="text-center py-10 text-gray-400">No testimonials found.</p>
      )}
    </div>
  </motion.div>
);

// Admin Testimonial Card
const TestimonialCardAdmin = ({ testimonial, actionStates, handleAction, handleEdit, isAllTestimonials }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="bg-[var(--card-bg)] p-5 rounded-xl border border-white/10 relative"
  >
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-[var(--neon-color)] text-white flex items-center justify-center font-bold text-lg shrink-0">
        {testimonial.name[0]}
      </div>
      <div className="flex-grow">
        <p className="font-bold text-white">{testimonial.name}</p>
        {testimonial.company && <p className="text-sm text-gray-400">{testimonial.company}</p>}
      </div>
      {isAllTestimonials && (
        <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${testimonial.approved ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
          {testimonial.approved ? 'Approved' : 'Pending'}
        </span>
      )}
    </div>
    <p className="text-gray-300 my-4 italic">“{testimonial.message}”</p>
    <div className="flex items-center gap-2 pt-4 border-t border-white/10">
      {isAllTestimonials ? (
        <>
          <ActionButton icon={<FaEdit />} onClick={() => handleEdit(testimonial)} className="hover:text-blue-400">Edit</ActionButton>
          <ActionButton icon={<FaTrash />} onClick={() => handleAction(testimonial.id, 'delete')} className="hover:text-red-400">Delete</ActionButton>
        </>
      ) : (
        <>
          <ActionButton icon={<FaCheck />} onClick={() => handleAction(testimonial.id, 'approve')} className="hover:text-green-400" disabled={actionStates[testimonial.id]}>Approve</ActionButton>
          <ActionButton icon={<FaTimes />} onClick={() => handleAction(testimonial.id, 'delete')} className="hover:text-red-400" disabled={actionStates[testimonial.id]}>Reject</ActionButton>
        </>
      )}
      {actionStates[testimonial.id] && <FaSpinner className="animate-spin text-white" />}
    </div>
  </motion.div>
);

// Action Button
const ActionButton = ({ icon, children, ...props }) => (
  <button {...props} className={`flex items-center gap-2 text-sm text-gray-400 transition-colors disabled:opacity-50 disabled:cursor-wait ${props.className}`}>
    {icon}
    <span>{children}</span>
  </button>
);

// Edit Modal
const EditModal = ({ testimonial, setTestimonial, onClose, onSubmit, isSubmitting }) => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
      className="bg-[var(--card-bg)] rounded-2xl shadow-2xl w-full max-w-lg border border-white/10 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <form onSubmit={onSubmit} className="p-8 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Edit Testimonial</h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-white"><FaTimes /></button>
        </div>
        <ModalInput id="name" label="Name" value={testimonial.name} onChange={e => setTestimonial(t => ({...t, name: e.target.value}))} />
        <ModalInput id="company" label="Company" value={testimonial.company} onChange={e => setTestimonial(t => ({...t, company: e.target.value}))} />
        <ModalTextarea id="message" label="Message" value={testimonial.message} onChange={e => setTestimonial(t => ({...t, message: e.target.value}))} />
        <div className="flex justify-end gap-4">
          <button type="button" onClick={onClose} className="px-5 py-2 rounded-lg text-white hover:bg-white/10 transition-colors">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="px-5 py-2 rounded-lg bg-[var(--neon-color)] text-[var(--button-text)] font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2">
            {isSubmitting && <FaSpinner className="animate-spin" />} Save Changes
          </button>
        </div>
      </form>
    </motion.div>
  </motion.div>
);

const ModalInput = ({ id, label, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    <input id={id} type="text" {...props} className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-color)] transition-all" />
  </div>
);

const ModalTextarea = ({ id, label, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
    <textarea id={id} rows="4" {...props} className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--neon-color)] transition-all resize-none"></textarea>
  </div>
);
