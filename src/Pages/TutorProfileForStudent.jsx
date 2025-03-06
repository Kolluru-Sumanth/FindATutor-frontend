import React, { useState } from 'react';
import { Star, MapPin, Calendar, Clock, Book, Award, MessageCircle, ThumbsUp, Bookmark, Share2, ChevronLeft } from 'lucide-react';

const TutorProfileForStudent = () => {
  const [activeTab, setActiveTab] = useState('about');
  
  // Sample tutor data
  const tutor = {
    id: 1,
    name: "Alex Kim",
    role: "Math Professor",
    tagline: "Making complex math simple since 2018",
    profileImage: "https://www.sciencefriday.com/wp-content/uploads/2023/10/elon-musk.jpg",
    rating: 4.9,
    reviewCount: 124,
    rate: 45,
    location: "New York, NY",
    education: "Ph.D. Mathematics, MIT",
    experience: "5+ years teaching at NYU",
    subjects: ["Calculus", "Statistics", "Linear Algebra", "Discrete Mathematics"],
    languages: ["English", "Korean"],
    about: "I believe that math should be accessible to everyone. With over 5 years of experience teaching at university level, I've developed methods to break down complex mathematical concepts into understandable pieces. My teaching style is interactive and focused on building intuition rather than memorization. I specialize in helping students who struggle with math anxiety or have had negative experiences with math in the past.",
    achievements: [
      "Mathematics Teaching Excellence Award, 2022",
      "Published researcher in applied statistics",
      "Developed custom curriculum for struggling students"
    ],
    availableTimes: [
      { day: "Monday", slots: ["3:00 PM - 6:00 PM"] },
      { day: "Wednesday", slots: ["4:00 PM - 8:00 PM"] },
      { day: "Friday", slots: ["2:00 PM - 5:00 PM"] },
      { day: "Saturday", slots: ["10:00 AM - 2:00 PM"] }
    ],
    sessionCompleted: 342,
    responseRate: "98%",
    responseTime: "Under 2 hours"
  };
  
  // Sample reviews
  const reviews = [
    {
      id: 1,
      studentName: "Jamie Chen",
      profilePic: "/api/placeholder/50/50",
      rating: 5,
      date: "2 weeks ago",
      comment: "Alex is an amazing tutor! He helped me understand calculus concepts I'd been struggling with for months. He's patient and explains things in multiple ways until it clicks. Definitely booking more sessions!",
      subject: "Calculus I",
      helpful: 24
    },
    {
      id: 2,
      studentName: "Taylor Jackson",
      profilePic: "https://www.sciencefriday.com/wp-content/uploads/2023/10/elon-musk.jpg",
      rating: 5,
      date: "1 month ago",
      comment: "I was failing statistics before I started working with Alex. He has a way of making complicated formulas make sense. His visual explanations really helped me understand probability distributions. Now I have a B+ in the class!",
      subject: "Statistics",
      helpful: 18
    },
    {
      id: 3,
      studentName: "Riley Smith",
      profilePic: "/api/placeholder/50/50",
      rating: 4,
      date: "2 months ago",
      comment: "Alex is very knowledgeable and prepared for our sessions. He creates practice problems specifically targeted to the areas where I'm struggling. The only reason I'm not giving 5 stars is because sometimes the sessions run over time, but honestly that's because he's making sure I understand everything.",
      subject: "Linear Algebra",
      helpful: 12
    },
    {
      id: 4,
      studentName: "Morgan Wilson",
      profilePic: "/api/placeholder/50/50",
      rating: 5,
      date: "3 months ago",
      comment: "Before finding Alex, I had given up on ever understanding math. I've always had math anxiety, but Alex created such a comfortable learning environment. For the first time, I actually look forward to math problems! Cannot recommend enough.",
      subject: "Calculus II",
      helpful: 31
    }
  ];
  
  // Rating statistics
  const ratingStats = {
    5: 85,
    4: 28,
    3: 8,
    2: 2,
    1: 1
  };
  
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
    const percentage = (value / total) * 100;
    return (
      <div className="w-full bg-[#F1F6F9] rounded-full h-2.5">
        <div 
          className="bg-[#14274E] h-2.5 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-[#F1F6F9]">
      {/* Header */}
      <header className="bg-[#14274E] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <ChevronLeft className="mr-2" size={24} />
            <h1 className="text-2xl font-bold">TutorMatch</h1>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-[#9BA4B4] transition">Home</a>
            <a href="#" className="hover:text-[#9BA4B4] transition">Tutors</a>
            <a href="#" className="hover:text-[#9BA4B4] transition">How it Works</a>
            <a href="#" className="hover:text-[#9BA4B4] transition">About Us</a>
            <button className="bg-[#394867] hover:bg-[#9BA4B4] transition px-4 py-2 rounded-full">
              Sign In
            </button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto p-4">
        {/* Top Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          {/* Mobile View */}
          <div className="md:hidden">
            <div className="relative h-40 bg-gradient-to-r from-[#14274E] to-[#394867]">
              <div className="absolute -bottom-16 left-4 w-32 h-32 rounded-full overflow-hidden border-4 border-white">
                <img src={tutor.profileImage} alt={tutor.name} className="w-full h-full object-cover" />
              </div>
            </div>
            
            <div className="pt-20 px-4 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-[#14274E]">{tutor.name}</h1>
                  <p className="text-[#394867]">{tutor.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#14274E]">${tutor.rate}</p>
                  <p className="text-sm text-[#9BA4B4]">per hour</p>
                </div>
              </div>
              
              <div className="flex items-center mt-2">
                {renderStars(tutor.rating)}
                <span className="ml-1 text-[#394867]">{tutor.rating}</span>
                <span className="ml-2 text-[#9BA4B4]">({tutor.reviewCount} reviews)</span>
              </div>
              
              <div className="flex items-center mt-2 text-[#394867]">
                <MapPin size={16} className="mr-1" />
                <span>{tutor.location}</span>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-[#14274E] hover:bg-[#394867] text-white py-2 rounded-full transition flex items-center justify-center">
                  <MessageCircle size={16} className="mr-1" /> Message
                </button>
                <button className="flex-1 bg-[#394867] hover:bg-[#14274E] text-white py-2 rounded-full transition flex items-center justify-center">
                  <Calendar size={16} className="mr-1" /> Book Session
                </button>
              </div>
            </div>
          </div>
          
          {/* Desktop View */}
          <div className="hidden md:flex">
            <div className="w-1/3 p-6 border-r border-[#F1F6F9]">
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
                  <img src={tutor.profileImage} alt={tutor.name} className="w-full h-full object-cover" />
                </div>
                
                <h1 className="text-2xl font-bold text-[#14274E] text-center mb-1">{tutor.name}</h1>
                <p className="text-[#394867] mb-2">{tutor.role}</p>
                
                <div className="flex items-center mb-3">
                  {renderStars(tutor.rating)}
                  <span className="ml-1 text-[#394867]">{tutor.rating}</span>
                  <span className="ml-2 text-[#9BA4B4]">({tutor.reviewCount} reviews)</span>
                </div>
                
                <div className="flex items-center mb-4 text-[#394867]">
                  <MapPin size={16} className="mr-1" />
                  <span>{tutor.location}</span>
                </div>
                
                <div className="w-full space-y-3 mt-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#394867]">Education:</span>
                    <span className="text-[#14274E] font-medium">{tutor.education}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#394867]">Experience:</span>
                    <span className="text-[#14274E] font-medium">{tutor.experience}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#394867]">Sessions:</span>
                    <span className="text-[#14274E] font-medium">{tutor.sessionCompleted}+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#394867]">Response:</span>
                    <span className="text-[#14274E] font-medium">{tutor.responseTime}</span>
                  </div>
                </div>
                
                <div className="w-full space-y-2">
                  <button className="w-full bg-[#14274E] hover:bg-[#394867] text-white py-2 rounded-full transition flex items-center justify-center">
                    <Calendar size={16} className="mr-1" /> Book Session
                  </button>
                  <button className="w-full bg-[#394867] hover:bg-[#14274E] text-white py-2 rounded-full transition flex items-center justify-center">
                    <MessageCircle size={16} className="mr-1" /> Message
                  </button>
                  <div className="flex space-x-2 mt-2">
                    <button className="flex-1 border border-[#9BA4B4] hover:bg-[#F1F6F9] text-[#394867] py-2 rounded-full transition flex items-center justify-center">
                      <Bookmark size={16} className="mr-1" /> Save
                    </button>
                    <button className="flex-1 border border-[#9BA4B4] hover:bg-[#F1F6F9] text-[#394867] py-2 rounded-full transition flex items-center justify-center">
                      <Share2 size={16} className="mr-1" /> Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-2/3 p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#14274E]">{tutor.tagline}</h2>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tutor.subjects.map((subject, index) => (
                      <span key={index} className="px-3 py-1 bg-[#F1F6F9] text-[#394867] rounded-full text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#14274E]">${tutor.rate}</p>
                  <p className="text-sm text-[#9BA4B4]">per hour</p>
                </div>
              </div>
              
              {/* Tabs */}
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
              
              {/* Tab Content */}
              <div>
                {activeTab === 'about' && (
                  <div>
                    <p className="text-[#394867] mb-4">{tutor.about}</p>
                    <div className="mb-4">
                      <h3 className="font-medium text-[#14274E] mb-2">Languages</h3>
                      <div className="flex gap-2">
                        {tutor.languages.map((language, index) => (
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
                      {tutor.availableTimes.map((timeSlot, index) => (
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
                      {tutor.achievements.map((achievement, index) => (
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
        
        {/* Mobile Tabs */}
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
                  {tutor.subjects.map((subject, index) => (
                    <span key={index} className="px-3 py-1 bg-[#F1F6F9] text-[#394867] rounded-full text-sm">
                      {subject}
                    </span>
                  ))}
                </div>
                <p className="text-[#394867] mb-4">{tutor.about}</p>
                <div className="mb-4">
                  <h3 className="font-medium text-[#14274E] mb-2">Languages</h3>
                  <div className="flex gap-2">
                    {tutor.languages.map((language, index) => (
                      <span key={index} className="px-3 py-1 bg-[#F1F6F9] text-[#394867] rounded-full text-sm">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-3 mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#394867]">Education:</span>
                    <span className="text-[#14274E] font-medium">{tutor.education}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#394867]">Experience:</span>
                    <span className="text-[#14274E] font-medium">{tutor.experience}</span>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'schedule' && (
              <div>
                <h3 className="font-medium text-[#14274E] mb-3">Available Times</h3>
                <div className="grid grid-cols-1 gap-3">
                  {tutor.availableTimes.map((timeSlot, index) => (
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
                  {tutor.achievements.map((achievement, index) => (
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
        
        {/* Reviews Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#14274E] mb-6">Student Reviews</h2>
            
            <div className="flex flex-col md:flex-row mb-8">
              <div className="md:w-1/3 mb-6 md:mb-0 md:pr-6 md:border-r md:border-[#F1F6F9]">
                <div className="flex flex-col items-center">
                  <div className="text-4xl font-bold text-[#14274E]">{tutor.rating}</div>
                  <div className="flex mb-1 mt-1">
                    {renderStars(tutor.rating)}
                  </div>
                  <div className="text-[#9BA4B4] text-sm">{tutor.reviewCount} reviews</div>
                  
                  <div className="w-full mt-6 space-y-3">
                    {[5, 4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center">
                        <div className="flex items-center w-20">
                          <span className="text-sm mr-1">{rating}</span>
                          <Star size={12} className="text-yellow-400 fill-yellow-400" />
                        </div>
                        <div className="flex-grow mx-2">
                          {renderRatingBar(ratingStats[rating], tutor.reviewCount)}
                        </div>
                        <div className="w-12 text-right text-sm text-[#394867]">
                          {Math.round((ratingStats[rating] / tutor.reviewCount) * 100)}%
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