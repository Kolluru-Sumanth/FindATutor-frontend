import React, { useState, useEffect } from 'react';
import { Star, MapPin, Calendar, Clock, Book, Award, MessageCircle, ThumbsUp, Bookmark, Share2, ChevronLeft } from 'lucide-react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import AddReviewForm from '../components/addReview';

const API = import.meta.env.VITE_API;

const TutorProfileForStudent = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { tutorId } = useParams();
  const [reviews, setReviews] = useState([]);

  const Achievements = [
    "Achieved 95% student success rates via tailored teaching and mentorship.",
    "Created interactive resources that reduced learning gaps by 40%."
  ];
  const languages = ["English", "Hindi", "Telugu"];
  const scheduleData = [
    { day: "Monday", slots: ["10:00 AM - 11:30 AM", "2:00 PM - 3:30 PM"] },
    { day: "Thursday", slots: ["10:00 AM - 11:30 AM", "2:00 PM - 3:30 PM"] },
    { day: "Friday", slots: ["9:00 AM - 10:30 AM", "1:00 PM - 2:30 PM"] },
  ];

  const handleReviewAdded = (newReview) => {
    const formattedReview = {
      id: newReview._id,
      studentName: "You",
      profilePic: "/api/placeholder/50/50",
      rating: newReview.rating,
      date: "Just now",
      comment: newReview.comment,
      subject: newReview.subject || "Recent Session",
      helpful: 0
    };
    setReviews([formattedReview, ...reviews]);
  };

  function calculateRatingStats(reviews) {
    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach(review => {
      const rating = review.rating;
      if (rating >= 1 && rating <= 5) {
        ratingCounts[rating]++;
      }
    });
    return ratingCounts;
  }

  const ratingStats = calculateRatingStats(reviews);

  useEffect(() => {
    const fetchTutorData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API}/api/tutors/${tutorId}`);
        setTutor(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching tutor data:', err);
        setError(err.response?.data?.message || 'Failed to load tutor data');
      } finally {
        setLoading(false);
      }
    };

    if (tutorId) {
      fetchTutorData();
    }
  }, [tutorId]);

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            size={16} 
            className={`${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
          />
        ))}
      </div>
    );
  };

  const renderRatingBar = (value, total) => {
    const percentage = total > 0 ? Math.min((value / total) * 100, 100) : 0;
    return (
      <div className="w-full bg-[#F1F6F9] rounded-full h-2.5">
        <div 
          className="bg-[#14274E] h-2.5 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1F6F9] flex items-center justify-center">
        <div className="text-[#14274E] text-xl">Loading tutor profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F1F6F9] flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-[#394867]">{error}</p>
          <button 
            onClick={() => window.history.back()} 
            className="mt-4 flex items-center text-[#14274E]"
          >
            <ChevronLeft size={16} className="mr-1" /> Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-[#F1F6F9] flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-[#14274E] mb-2">Tutor Not Found</h2>
          <p className="text-[#394867]">The tutor you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => window.history.back()} 
            className="mt-4 flex items-center text-[#14274E]"
          >
            <ChevronLeft size={16} className="mr-1" /> Go Back
          </button>
        </div>
      </div>
    );
  }

  const reviewCount = reviews.length;

  function onhandlebooking() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const token = currentUser.token;
    let subject = tutor.subjects;

    axios.post(`${API}/api/bookings`, { tutorId: tutor._id, subject }, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    .then((response) => {
      console.log(response.data);
      navigate('/stripe');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="min-h-screen bg-[#F1F6F9]">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="md:hidden">
            <div className="relative h-40 bg-gradient-to-r from-[#14274E] to-[#394867]">
              <div className="absolute -bottom-16 left-4 w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                <img src={`${API}/${tutor.profilePicture}`} alt={tutor.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="pt-20 px-4 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-[#14274E]">{tutor.name}</h1>
                  <p className="text-[#394867]">{tutor.profession}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#14274E]">₹{tutor.price}</p>
                  <p className="text-sm text-[#9BA4B4]">per hour</p>
                </div>
              </div>
              <div className="flex items-center mt-2">
                {renderStars(tutor.rating?.average || 0)}
                <span className="ml-1 text-[#394867]">{tutor.rating?.average || 0}</span>
                <span className="ml-2 text-[#9BA4B4]">({reviewCount} reviews)</span>
              </div>
              <div className="flex items-center mt-2 text-[#394867]">
                <MapPin size={16} className="mr-1" />
                <span>{tutor.locations.join(", ")}</span>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-[#14274E] hover:bg-[#394867] text-white py-2 rounded-full transition flex items-center justify-center">
                  <MessageCircle size={16} className="mr-1" /> Message
                </button>
                <button onClick={onhandlebooking} className="flex-1 bg-[#394867] hover:bg-[#14274E] text-white py-2 rounded-full transition flex items-center justify-center">
                  <Calendar size={16} className="mr-1" /> Book Session
                </button>
              </div>
            </div>
          </div>
          <div className="hidden md:flex">
            <div className="w-1/3 p-6 border-r border-[#F1F6F9]">
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
                  <img src={`${API}/${tutor.profilePicture || "/api/placeholder/150/150"}`} alt={tutor.name} className="w-full h-full object-cover" />
                </div>
                <h1 className="text-2xl font-bold text-[#14274E] text-center mb-1">{tutor.name}</h1>
                <p className="text-[#394867] mb-2">{tutor.profession}</p>
                <div className="flex items-center mb-3">
                  {renderStars(tutor.rating?.average || 0)}
                  <span className="ml-1 text-[#394867]">{tutor.rating?.average || 0}</span>
                  <span className="ml-2 text-[#9BA4B4]">({reviewCount} reviews)</span>
                </div>
                <div className="flex items-center mb-4 text-[#394867]">
                  <MapPin size={16} className="mr-1" />
                  <span>{tutor.locations.join(", ")}</span>
                </div>
                <div className="w-full space-y-3 mt-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#394867]">Education:</span>
                    <span className="text-[#14274E] font-medium">{tutor.profession}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#394867]">Experience:</span>
                    <span className="text-[#14274E] font-medium">1+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#394867]">Sessions:</span>
                    <span className="text-[#14274E] font-medium">{tutor.bookings?.length || 0}+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#394867]">Response:</span>
                    <span className="text-[#14274E] font-medium">Under 24 hours</span>
                  </div>
                </div>
                <div className="w-full space-y-2">
                  <button onClick={onhandlebooking} className="w-full bg-[#14274E] hover:bg-[#394867] text-white py-2 rounded-full transition flex items-center justify-center">
                    <Calendar size={16} className="mr-1" /> Book Session
                  </button>
                </div>
              </div>
            </div>
            <div className="w-2/3 p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tutor.subjects?.map((subject, index) => (
                      <span key={index} className="px-3 py-1 bg-[#F1F6F9] text-[#394867] rounded-full text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#14274E]">${tutor.price}</p>
                  <p className="text-sm text-[#9BA4B4]">per hour</p>
                </div>
              </div>
              <div className="border-b border-[#F1F6F9] mb-4">
                <div className="flex space-x-6">
                  <button 
                    className={`py-2 px-1 ${activeTab === 'about' ? 'text-[#14274E] border-b-2 border-[#14274E] font-medium' : 'text-[#9BA4B4]'}`}
                    onClick={() => setActiveTab('about')}
                  >
                    About
                  </button>
                  <button 
                    className={`py-2 px-1 ${activeTab === 'schedule' ? 'text-[#14274E] border-b-2 border-[#14274E] font-medium' : 'text-[#9BA4B4]'}`}
                    onClick={() => setActiveTab('schedule')}
                  >
                    Schedule
                  </button>
                  <button 
                    className={`py-2 px-1 ${activeTab === 'achievements' ? 'text-[#14274E] border-b-2 border-[#14274E] font-medium' : 'text-[#9BA4B4]'}`}
                    onClick={() => setActiveTab('achievements')}
                  >
                    Achievements
                  </button>
                </div>
              </div>
              <div>
                {activeTab === 'about' && (
                  <div>
                    <p className="text-[#394867] mb-4">
                      Dedicated educator and researcher with a passion for advancing knowledge and fostering intellectual curiosity across disciplines. Committed to empowering students through innovative teaching, critical thinking, and mentorship, while bridging academic theory with real-world applications. Published extensively in peer-reviewed journals and actively engaged in collaborative, interdisciplinary projects that drive meaningful impact. Strives to cultivate an inclusive academic environment that inspires lifelong learning and prepares future leaders to tackle global challenges.
                    </p>
                    <div className="mb-4">
                      <h3 className="font-medium text-[#14274E] mb-2">Languages</h3>
                      <div className="flex gap-2">
                        {languages.map((language, index) => (
                          <span key={index} className="px-3 py-1 bg-[#F1F6F9] text-[#394867] rounded-full text-sm">
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'schedule' && (
                  <div>
                    <h3 className="font-medium text-[#14274E] mb-3">Available Times</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {( scheduleData).map((timeSlot, index) => (
                        <div key={index} className="bg-[#F1F6F9] p-3 rounded-lg">
                          <p className="font-medium text-[#14274E]">{timeSlot.day}</p>
                          {timeSlot.slots.map((slot, idx) => (
                            <div key={idx} className="flex items-center text-[#394867] mt-1">
                              <Clock size={14} className="mr-1" />
                              <span>{slot}</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === 'achievements' && (
                  <div>
                    <h3 className="font-medium text-[#14274E] mb-3">Achievements & Credentials</h3>
                    <ul className="space-y-2">
                      {Achievements.map((achievement, index) => (
                        <li key={index} className="flex">
                          <Award size={18} className="mr-2 text-[#394867] flex-shrink-0 mt-1" />
                          <span className="text-[#394867]">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="flex border-b border-[#F1F6F9]">
            <button 
              className={`flex-1 py-3 ${activeTab === 'about' ? 'text-[#14274E] border-b-2 border-[#14274E] font-medium' : 'text-[#9BA4B4]'}`}
              onClick={() => setActiveTab('about')}
            >
              About
            </button>
            <button 
              className={`flex-1 py-3 ${activeTab === 'schedule' ? 'text-[#14274E] border-b-2 border-[#14274E] font-medium' : 'text-[#9BA4B4]'}`}
              onClick={() => setActiveTab('schedule')}
            >
              Schedule
            </button>
            <button 
              className={`flex-1 py-3 ${activeTab === 'achievements' ? 'text-[#14274E] border-b-2 border-[#14274E] font-medium' : 'text-[#9BA4B4]'}`}
              onClick={() => setActiveTab('achievements')}
            >
              Achievements
            </button>
          </div>
          <div className="p-4">
            {activeTab === 'about' && (
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tutor.subjects?.map((subject, index) => (
                    <span key={index} className="px-3 py-1 bg-[#F1F6F9] text-[#394867] rounded-full text-sm">
                      {subject}
                    </span>
                  ))}
                </div>
                <p className="text-[#394867] mb-4">{tutor.about}</p>
                <div className="mb-4">
                  <h3 className="font-medium text-[#14274E] mb-2">Languages</h3>
                  <div className="flex gap-2">
                    {languages.map((language, index) => (
                      <span key={index} className="px-3 py-1 bg-[#F1F6F9] text-[#394867] rounded-full text-sm">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#394867]">Education:</span>
                    <span className="text-[#14274E] font-medium">{tutor.profession}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#394867]">Experience:</span>
                    <span className="text-[#14274E] font-medium">1+</span>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'schedule' && (
              <div>
                <h3 className="font-medium text-[#14274E] mb-3">Available Times</h3>
                <div className="grid grid-cols-1 gap-3">
                  {(tutor.availability || scheduleData).map((timeSlot, index) => (
                    <div key={index} className="bg-[#F1F6F9] p-3 rounded-lg">
                      <p className="font-medium text-[#14274E]">{timeSlot.day}</p>
                      {timeSlot.slots.map((slot, idx) => (
                        <div key={idx} className="flex items-center text-[#394867] mt-1">
                          <Clock size={14} className="mr-1" />
                          <span>{slot}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'achievements' && (
              <div>
                <h3 className="font-medium text-[#14274E] mb-3">Achievements & Credentials</h3>
                <ul className="space-y-2">
                  {Achievements.map((achievement, index) => (
                    <li key={index} className="flex">
                      <Award size={18} className="mr-2 text-[#394867] flex-shrink-0 mt-1" />
                      <span className="text-[#394867]">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <AddReviewForm tutorId={tutorId} onReviewAdded={handleReviewAdded} />
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#14274E] mb-6">Student Reviews</h2>
            <div className="flex flex-col md:flex-row mb-8">
              <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6 md:border-r md:border-[#F1F6F9]">
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-[#14274E]">{tutor.rating?.average || 0}</div>
                  <div className="flex mb-1 mt-1">
                    {renderStars(tutor.rating?.average || 0)}
                  </div>
                  <div className="text-[#9BA4B4] text-sm">{reviewCount} reviews</div>
                  <div className="w-full mt-6 space-y-3">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center">
                        <div className="flex items-center w-20">
                          <span className="text-sm mr-1">{rating}</span>
                          <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        </div>
                        <div className="flex-grow mx-2">
                          {renderRatingBar(ratingStats[rating], reviewCount)}
                        </div>
                        <div className="w-12 text-right text-sm text-[#394867]">
                          {reviewCount > 0 ? Math.round((ratingStats[rating] / reviewCount) * 100) : 0}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 md:pl-6">
                <div className="space-y-6">
                  {reviews.map(review => (
                    <div key={review.id} className="pb-6 border-b border-[#F1F6F9] last:border-b-0 last:pb-0">
                      <div className="flex justify-between">
                        <div className="flex">
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                            <img src={review.profilePic} alt={review.studentName} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-medium text-[#14274E]">{review.studentName}</h4>
                            <div className="flex items-center">
                              {renderStars(review.rating)}
                              <span className="ml-2 text-[#9BA4B4] text-sm">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <span className="px-3 py-1 bg-[#F1F6F9] text-[#394867] rounded-full text-xs">
                            {review.subject}
                          </span>
                        </div>
                      </div>
                      <p className="text-[#394867] mt-3">{review.comment}</p>
                      <div className="mt-3 flex items-center">
                        <button className="flex items-center text-[#394867] hover:text-[#14274E]">
                          <ThumbsUp size={14} className="mr-1" />
                          <span className="text-sm">Helpful ({review.helpful})</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfileForStudent;