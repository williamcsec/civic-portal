import { useState } from 'react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { X, Star } from 'lucide-react';

interface FeedbackModalProps {
  complaint: {
    id: string;
    description: string;
    status: string;
  };
  onSubmit: (feedback: { rating: number; comment: string; action: 'close' | 'reopen' }) => void;
  onClose: () => void;
}

export function FeedbackModal({ complaint, onSubmit, onClose }: FeedbackModalProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = (action: 'close' | 'reopen') => {
    onSubmit({ rating, comment, action });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-[#1E293B] border-[#475569]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white">Feedback for {complaint.id}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-[#334155]"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-[#334155] rounded-lg p-3">
            <p className="text-gray-300 text-sm">{complaint.description}</p>
          </div>

          <div>
            <label className="text-white mb-3 block">Rate your experience</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  className="p-1 transition-colors"
                >
                  <Star 
                    className={`h-6 w-6 ${
                      star <= (hoveredStar || rating) 
                        ? 'text-yellow-400 fill-yellow-400' 
                        : 'text-gray-400'
                    }`} 
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-white mb-2 block">Share your feedback</label>
            <Textarea
              placeholder="Tell us about your experience..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="bg-[#334155] border-[#475569] text-white placeholder:text-gray-400"
            />
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={() => handleSubmit('close')}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white"
              disabled={rating === 0}
            >
              Close Issue
            </Button>
            <Button
              onClick={() => handleSubmit('reopen')}
              variant="outline"
              className="flex-1 border-[#475569] text-white hover:bg-[#334155]"
            >
              Reopen Issue
            </Button>
          </div>

          <p className="text-gray-400 text-sm text-center">
            Your feedback helps us improve our services
          </p>
        </CardContent>
      </Card>
    </div>
  );
}