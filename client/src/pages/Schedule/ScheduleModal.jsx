import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const ScheduleModal = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [coordinates, setCoordinates] = useState([0, 0]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/sp-col/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          location: {
            type: 'Point',
            coordinates: coordinates,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to schedule collection');
      }

      toast.success('Collection scheduled successfully!');
      onClose();
    } catch (error) {
      toast.error('Error scheduling collection: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationPick = () => {
    setCoordinates([
      Math.random() * 180 - 90,
      Math.random() * 360 - 180
    ]);
    toast.success('Location picked!');
  };

  const ErrorMessage = ({ message }) => (
    <p className="text-red-500 text-sm mt-1">{message}</p>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg p-8 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-customGreen-dark">Schedule Special Collection</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-customGreen-dark transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Collection Type</label>
            <select
              {...register('collectionType', { required: 'Collection type is required' })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-customGreen-light focus:border-customGreen transition-all"
            >
              <option value="">Select type</option>
              <option value="Standard Waste">Standard Waste</option>
              <option value="Bulky Items">Bulky Items</option>
              <option value="Hazardous Waste">Hazardous Waste</option>
            </select>
            {errors.collectionType && <ErrorMessage message={errors.collectionType.message} />}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Collection Date</label>
              <input
                type="date"
                {...register('collectionDate', { required: 'Collection date is required' })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-customGreen-light focus:border-customGreen transition-all"
              />
              {errors.collectionDate && <ErrorMessage message={errors.collectionDate.message} />}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
              <select
                {...register('timeSlot', { required: 'Time slot is required' })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-customGreen-light focus:border-customGreen transition-all"
              >
                <option value="">Select time</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
              {errors.timeSlot && <ErrorMessage message={errors.timeSlot.message} />}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Waste Description</label>
            <textarea
              {...register('wasteDescription', { required: 'Waste description is required' })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-customGreen-light focus:border-customGreen transition-all"
              rows={3}
            ></textarea>
            {errors.wasteDescription && <ErrorMessage message={errors.wasteDescription.message} />}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Address</label>
            <input
              type="text"
              {...register('pickupAddress', { required: 'Pickup address is required' })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-customGreen-light focus:border-customGreen transition-all"
            />
            {errors.pickupAddress && <ErrorMessage message={errors.pickupAddress.message} />}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
            <textarea
              {...register('specialInstructions')}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-customGreen-light focus:border-customGreen transition-all"
              rows={2}
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                {...register('contactInfo.phoneNumber', { required: 'Phone number is required' })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-customGreen-light focus:border-customGreen transition-all"
              />
              {errors.contactInfo?.phoneNumber && <ErrorMessage message={errors.contactInfo.phoneNumber.message} />}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                {...register('contactInfo.email', { required: 'Email is required' })}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-customGreen-light focus:border-customGreen transition-all"
              />
              {errors.contactInfo?.email && <ErrorMessage message={errors.contactInfo.email.message} />}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <select
              {...register('paymentMethod', { required: 'Payment method is required' })}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-customGreen-light focus:border-customGreen transition-all"
            >
              <option value="">Select payment method</option>
              <option value="Online Payment">Online Payment</option>
              <option value="Pay-on-Pickup">Pay-on-Pickup</option>
            </select>
            {errors.paymentMethod && <ErrorMessage message={errors.paymentMethod.message} />}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <div className="flex items-center">
              <input
                type="text"
                value={`${coordinates[0].toFixed(6)}, ${coordinates[1].toFixed(6)}`}
                readOnly
                className="w-full p-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-customGreen-light focus:border-customGreen transition-all"
              />
              <button
                type="button"
                onClick={handleLocationPick}
                className="px-4 py-2 bg-customGreen text-white rounded-r-md hover:bg-customGreen-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customGreen transition-all"
              >
                <MapPin className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="termsAgreed"
              {...register('termsAgreed', { required: 'You must agree to the terms' })}
              className="h-4 w-4 text-customGreen focus:ring-customGreen-light border-gray-300 rounded"
            />
            <label htmlFor="termsAgreed" className="ml-2 block text-sm text-gray-900">
              I agree to the terms and conditions
            </label>
          </div>
          {errors.termsAgreed && <ErrorMessage message={errors.termsAgreed.message} />}

          <div className="flex justify-end space-x-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customGreen-light transition-all"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-customGreen text-white rounded-md hover:bg-customGreen-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customGreen-light transition-all flex items-center justify-center min-w-[150px]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  Scheduling...
                </>
              ) : (
                'Schedule Collection'
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ScheduleModal;