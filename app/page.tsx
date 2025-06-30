"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, Volume2, Trash2, Users, Plus, X, Search, UserPlus, Settings, 
  Heart, MessageCircle, Clock, Mic, Square, Sun, Moon, Send, CheckCircle, 
  AlertCircle, Loader, Palette, Smile, User, Edit3, Camera, Mail, Phone, 
  MapPin, Twitter, Instagram, Facebook, Linkedin, Globe, Shield, Info, 
  ChevronDown, ChevronUp, BarChart3, Zap, Sparkles, Headphones, Brush, 
  BookOpen, Coffee 
} from "lucide-react";

// Enhanced user types with profiles
type User = {
  id: number;
  name: string;
  interests: string[];
  bio: string;
  avatar: string;
  tags: string[];
  joinedAt: number;
};

type WhisperPost = {
  id: number;
  user: User;
  content: string;
  type: "text" | "poll" | "voice";
  fadeAt: number;
  tone: "support" | "rant" | "excited" | "neutral";
  createdAt: number;
  audioBlob?: Blob;
  pollQuestion?: string;
  pollOptions?: string[];
  pollVotes?: Record<number, number>;
  userVoted?: boolean;
};

type Circle = {
  id: number;
  name: string;
  description: string;
  members: User[];
  posts: WhisperPost[];
  createdAt: number;
  isPrivate: boolean;
};

// Demo users with enhanced profiles
const demoUsers: User[] = [
  { 
    id: 1, 
    name: "Alex Chen", 
    interests: ["Music Production", "AI/ML", "Philosophy", "Books"], 
    bio: "Creative technologist passionate about the intersection of art and AI. Always learning something new.",
    avatar: "AC", 
    tags: ["creative", "tech-savvy", "thoughtful", "collaborative"],
    joinedAt: Date.now() - 86400000 * 30
  },
  { 
    id: 2, 
    name: "Maya Rodriguez", 
    interests: ["Digital Art", "Poetry", "Nature Photography", "Mindfulness"], 
    bio: "Digital artist and poet finding beauty in everyday moments. Love connecting with like-minded souls.",
    avatar: "MR", 
    tags: ["artistic", "mindful", "nature-lover", "empathetic"],
    joinedAt: Date.now() - 86400000 * 45
  },
  { 
    id: 3, 
    name: "Sam Kumar", 
    interests: ["Web Development", "Travel", "Gaming", "Coffee"], 
    bio: "Full-stack developer who codes by day and explores the world on weekends. Always up for a good conversation over coffee.",
    avatar: "SK", 
    tags: ["developer", "adventurous", "friendly", "curious"],
    joinedAt: Date.now() - 86400000 * 20
  },
  { 
    id: 4, 
    name: "Jordan Taylor", 
    interests: ["Sustainable Living", "Cooking", "Yoga", "Books"], 
    bio: "Sustainability advocate learning to live more mindfully. Love sharing recipes and book recommendations.",
    avatar: "JT", 
    tags: ["eco-conscious", "wellness", "thoughtful", "helpful"],
    joinedAt: Date.now() - 86400000 * 15
  }
];

// Updated fade options starting from 1 minute
const fadeOptions = [
  { label: "1 minute", ms: 60 * 1000 },
  { label: "2 minutes", ms: 2 * 60 * 1000 },
  { label: "5 minutes", ms: 5 * 60 * 1000 },
  { label: "2 hours", ms: 2 * 60 * 60 * 1000 },
  { label: "24 hours", ms: 24 * 60 * 60 * 1000 },
];

// Mood analysis function with professional icons
const analyzeMood = (posts: WhisperPost[]) => {
  if (posts.length === 0) return <MessageCircle className="w-5 h-5 text-gray-500" />;
  const tones = posts.map((p) => p.tone);
  if (tones.includes("support")) return <Heart className="w-5 h-5 text-green-500" />;
  if (tones.includes("rant")) return <AlertCircle className="w-5 h-5 text-orange-500" />;
  if (tones.includes("excited")) return <Zap className="w-5 h-5 text-purple-500" />;
  return <MessageCircle className="w-5 h-5 text-blue-500" />;
};

// Enhanced Custom Select Component with smart positioning
function CustomSelect({
  options,
  value,
  onChange,
}: {
  options: typeof fadeOptions;
  value: number;
  onChange: (ms: number) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [showAbove, setShowAbove] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  React.useEffect(() => {
    if (open && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setShowAbove(true); // Always show above for fade options
    }
  }, [open]);

  const selected = options.find((opt) => opt.ms === value);

  return (
    <div className="relative w-32 sm:w-36" ref={ref}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 dark:border-white/20 bg-white/90 dark:bg-white/10 backdrop-blur-md text-gray-900 dark:text-gray-100 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:bg-white/95 dark:hover:bg-white/20 transition-all shadow-sm"
        onClick={() => setOpen((s) => !s)}
      >
        <span className="font-medium truncate">{selected?.label}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 ml-2" />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: showAbove ? 10 : -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: showAbove ? 10 : -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`absolute z-[60] w-full rounded-xl border border-gray-200 dark:border-white/20 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-2xl ${
              showAbove ? 'bottom-full mb-2' : 'top-full mt-1'
            }`}
          >
            {options.map((opt, index) => (
              <motion.li 
                key={opt.ms}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <button
                  type="button"
                  className={`w-full text-left px-4 py-2 text-sm transition-all font-medium first:rounded-t-xl last:rounded-b-xl ${
                    value === opt.ms
                      ? "bg-blue-500/80 text-white"
                      : "hover:bg-gray-100/80 dark:hover:bg-white/10 text-gray-900 dark:text-gray-100"
                  }`}
                  onClick={() => {
                    setOpen(false);
                    onChange(opt.ms);
                  }}
                >
                  {opt.label}
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

const Toast = ({ message, type = "info", onClose }: { message: string; type?: "success" | "error" | "info"; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case "success": return <CheckCircle size={20} />;
      case "error": return <AlertCircle size={20} />;
      default: return <Info size={20} />;
    }
  };

  const getColors = () => {
    switch (type) {
      case "success": return "bg-green-500/80 border-green-400/50";
      case "error": return "bg-red-500/80 border-red-400/50";
      default: return "bg-blue-500/80 border-blue-400/50";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`fixed bottom-6 right-6 ${getColors()} backdrop-blur-md text-white px-6 py-4 rounded-xl shadow-2xl z-[999] max-w-sm border flex items-center justify-between gap-3`}
    >
      <div className="flex items-center gap-3">
        {getIcon()}
        <span className="font-medium">{message}</span>
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClose}
        className="p-1 hover:bg-white/20 rounded-full transition-colors"
      >
        <X size={16} />
      </motion.button>
    </motion.div>
  );
};
// Enhanced Voice Player Component
const VoicePlayer = ({ 
  audioBlob, 
  onRemove, 
  showRemove = false 
}: {
  audioBlob: Blob;
  onRemove?: () => void;
  showRemove?: boolean;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioBlob) return;
    
    const url = URL.createObjectURL(audioBlob);
    audio.src = url;
    
    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      } else {
        setDuration(0);
      }
    };
    const handleEnded = () => setIsPlaying(false);
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.volume = volume;
    
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      URL.revokeObjectURL(url);
    };
  }, [audioBlob]);

  const togglePlay = async (e: React.MouseEvent) => {
    e.preventDefault();
    const audio = audioRef.current;
    if (!audio) return;
    
    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (err) {
      console.error('Audio playback error:', err);
    }
  };

  const handleProgressClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const audio = audioRef.current;
    const progressBar = progressRef.current;
    if (!audio || !progressBar || !duration) return;
    
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    if (!isFinite(time) || isNaN(time) || time <= 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-md border border-gray-200 dark:border-white/20 rounded-2xl p-4 w-full"
    >
      <audio ref={audioRef} preload="metadata" />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            disabled={!audioBlob}
            className={`w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all ${!audioBlob ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {isPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" className="ml-0.5" />
            )}
          </motion.button>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-2 gap-2">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                <Mic size={14} /> Voice Nudge
              </span>
              <span className="text-sm font-bold text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/30 px-2 py-1 rounded-lg backdrop-blur-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            {duration > 0 && (
              <div
                ref={progressRef}
                onClick={handleProgressClick}
                className="h-2 bg-blue-200/50 dark:bg-blue-800/50 rounded-full cursor-pointer relative overflow-hidden group backdrop-blur-sm"
              >
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-100 relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Volume2 size={16} className="text-blue-600 dark:text-blue-400" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => {
                const newVolume = parseFloat(e.target.value);
                setVolume(newVolume);
                if (audioRef.current) audioRef.current.volume = newVolume;
              }}
              className="w-16 h-1 bg-blue-200/50 dark:bg-blue-800/50 rounded-full appearance-none cursor-pointer backdrop-blur-sm"
            />
          </div>
          
          {showRemove && onRemove && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.preventDefault();
                onRemove();
              }}
              className="w-8 h-8 bg-red-100/50 hover:bg-red-200/50 dark:bg-red-900/30 dark:hover:bg-red-900/50 backdrop-blur-sm rounded-full flex items-center justify-center text-red-600 dark:text-red-400 transition-all cursor-pointer"
              title="Remove voice nudge"
            >
              <Trash2 size={16} />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// Profile Modal Component
const ProfileModal = ({ user, onClose }: { user: User; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-6 max-w-md w-full border border-gray-200 dark:border-white/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Profile</h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </motion.button>
        </div>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            {user.avatar}
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Joined {new Date(user.joinedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="mb-4">
          <h5 className="font-medium text-gray-900 dark:text-white mb-2">Bio</h5>
          <p className="text-sm text-gray-600 dark:text-gray-400">{user.bio}</p>
        </div>
        
        <div className="mb-4">
          <h5 className="font-medium text-gray-900 dark:text-white mb-2">Interests</h5>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium"
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </div>
        
        <div>
          <h5 className="font-medium text-gray-900 dark:text-white mb-2">Tags</h5>
          <div className="flex flex-wrap gap-2">
            {user.tags.map((tag, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
              >
                #{tag}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Add Members Modal Component
const AddMembersModal = ({ 
  circle, 
  onClose, 
  onAddMember 
}: { 
  circle: Circle; 
  onClose: () => void; 
  onAddMember: (user: User) => void; 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const availableUsers = demoUsers.filter(u => !circle.members.some(m => m.id === u.id));
  const filteredUsers = availableUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.interests.some(i => i.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl p-6 max-w-md w-full border border-gray-200 dark:border-white/20 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Add Members</h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </motion.button>
        </div>
        
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  {user.avatar}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{user.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user.interests.slice(0, 2).join(", ")}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onAddMember(user);
                  onClose();
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg transition-colors font-medium"
              >
                Add
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Component
function WhisperCircles() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [currentUser] = useState(demoUsers[0]);
  const [circles, setCircles] = useState<Circle[]>([
    {
      id: 1,
      name: "Creative Minds",
      description: "For artists, writers, and creative thinkers to share inspiration",
      members: [demoUsers[0], demoUsers[1]],
      posts: [
        {
          id: 1,
          user: demoUsers[0],
          content: "Just finished a new digital piece! The intersection of AI and art keeps fascinating me. What creative projects are you all working on?",
          type: "text",
          fadeAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
          tone: "excited",
          createdAt: Date.now() - 300000,
        },
        {
          id: 2,
          user: demoUsers[1],
          content: "Sending some positive vibes your way!",
          type: "voice",
          fadeAt: Date.now() + 2 * 60 * 60 * 1000, // 2 hours from now
          tone: "support",
          createdAt: Date.now() - 600000,
        },
      ],
      createdAt: Date.now() - 86400000 * 10,
      isPrivate: false,
    },
  ]);
  
  const [selectedCircle, setSelectedCircle] = useState(circles[0]);
  const [newPost, setNewPost] = useState("");
  const [fadeMs, setFadeMs] = useState(fadeOptions[0].ms); // Default to 1 minute
  const [showPoll, setShowPoll] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [recording, setRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingDuration, setRecordingDuration] = useState(30);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recordingError, setRecordingError] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | "info">("info");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Record<number, { from: string; text: string; time: number }[]>>({
    [circles[0].id]: [],
  });
  const [userPollVotes, setUserPollVotes] = useState<Record<number, number>>({});
  const [showProfile, setShowProfile] = useState(false);
  const [showAddMembers, setShowAddMembers] = useState(false);
  const [tick, setTick] = useState(0); // Added for periodic updates

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  // Update selected circle when circles change
  useEffect(() => {
    const updatedCircle = circles.find(c => c.id === selectedCircle.id);
    if (updatedCircle) setSelectedCircle(updatedCircle);
  }, [circles, selectedCircle.id]);

  // Initialize chat messages for new circles
  useEffect(() => {
    setChatMessages((prev) => {
      const updated = { ...prev };
      circles.forEach((circle) => {
        if (!updated[circle.id]) updated[circle.id] = [];
      });
      return updated;
    });
  }, [circles]);

  // Periodic re-render every second for fade effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Function to format remaining fade time
  const formatRemainingTime = (fadeAt: number, now: number) => {
    const remainingSeconds = Math.max(0, Math.ceil((fadeAt - now) / 1000));
    if (remainingSeconds < 60) {
      return `${remainingSeconds} sec`;
    } else {
      const minutes = Math.floor(remainingSeconds / 60);
      const seconds = remainingSeconds % 60;
      return `${minutes}m ${seconds}s`;
    }
  };

  // Tone detection, show toast, voice recording functions
  function getTone(text: string): WhisperPost["tone"] {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("excited") || lowerText.includes("amazing") || text.includes("!")) return "excited";
    if (lowerText.includes("support") || lowerText.includes("help") || lowerText.includes("care")) return "support";
    if (lowerText.includes("ugh") || lowerText.includes("frustrated") || text.includes("...")) return "rant";
    return "neutral";
  }

  const showToast = (message: string, type: "success" | "error" | "info" = "info") => {
    setToastMessage(message);
    setToastType(type);
  };

  async function startRecording() {
    setRecording(true);
    setRecordingTime(0);
    setRecordingError(null);
    setAudioBlob(null);
    showToast("Voice recording started", "info");
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
        setRecording(false);
        setRecordingTime(0);
        showToast("Voice recording completed", "success");
        stream.getTracks().forEach(track => track.stop());
        if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
      };
      
      mediaRecorderRef.current.onerror = (e: any) => {
        setRecordingError("Recording failed: " + e.error?.message);
        setRecording(false);
        setRecordingTime(0);
        showToast("Recording failed", "error");
        stream.getTracks().forEach(track => track.stop());
        if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
      };
      
      mediaRecorderRef.current.start();
      
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => {
          const newTime = prev + 1;
          if (newTime >= recordingDuration) stopRecording();
          return newTime;
        });
      }, 1000);
      
    } catch (err) {
      setRecordingError("Microphone access denied or unavailable");
      setRecording(false);
      showToast("Microphone access denied", "error");
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current?.state === "recording") mediaRecorderRef.current.stop();
    if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
  }

  function handleAddPost(type: WhisperPost["type"], content: string) {
    if (type === "voice") {
      setPosting(true);
      showToast("Voice nudge posting...", "info");
    } else if (type === "poll") {
      setPosting(true);
      showToast("Creating poll...", "info");
    } else {
      setPosting(true);
      showToast("Creating post...", "info");
    }
    
    setTimeout(() => {
      const timestamp = Date.now();
      const postId = Date.now();
      
      const newPostData: WhisperPost = {
        id: postId,
        user: currentUser,
        content,
        type,
        fadeAt: timestamp + fadeMs,
        tone: type === "voice" ? "support" : getTone(content),
        createdAt: timestamp,
        audioBlob: type === "voice" && audioBlob ? new Blob([audioBlob], { type: "audio/webm" }) : undefined,
        pollQuestion: type === "poll" ? pollQuestion : undefined,
        pollOptions: type === "poll" ? pollOptions.filter(Boolean) : undefined,
        pollVotes: type === "poll" ? {} : undefined,
        userVoted: false,
      };
      
      setCircles((prev) =>
        prev.map((c) =>
          c.id === selectedCircle.id ? { ...c, posts: [...c.posts, newPostData] } : c
        )
      );
      
      setNewPost("");
      setShowPoll(false);
      setPollQuestion("");
      setPollOptions(["", ""]);
      setAudioBlob(null);
      setRecordingError(null);
      setPosting(false);
      
      if (type === "poll") {
        showToast("Poll created successfully!", "success");
      } else if (type === "voice") {
        showToast("Voice nudge sent!", "success");
      } else {
        showToast("Post created successfully!", "success");
      }
    }, 1000);
  }

  function handlePollVote(postId: number, optionIndex: number) {
    if (userPollVotes[postId] !== undefined) {
      showToast("You can only vote once per poll", "error");
      return;
    }

    setUserPollVotes(prev => ({ ...prev, [postId]: optionIndex }));

    setCircles(prev => 
      prev.map(circle => 
        circle.id === selectedCircle.id
          ? {
              ...circle,
              posts: circle.posts.map(post => 
                post.id === postId && post.pollVotes
                  ? {
                      ...post,
                      pollVotes: {
                        ...post.pollVotes,
                        [optionIndex]: (post.pollVotes[optionIndex] || 0) + 1
                      },
                      userVoted: true
                    }
                  : post
              )
            }
          : circle
      )
    );

    showToast("Vote recorded!", "success");
  }

  const handleAddMember = (user: User) => {
    setCircles(prev => 
      prev.map(circle => 
        circle.id === selectedCircle.id
          ? { ...circle, members: [...circle.members, user] }
          : circle
      )
    );
    showToast(`${user.name} added to circle!`, "success");
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    setChatMessages((prev) => ({
      ...prev,
      [selectedCircle.id]: [
        ...(prev[selectedCircle.id] || []),
        { from: currentUser.name, text: chatInput, time: Date.now() },
      ],
    }));
    setChatInput("");
    showToast("Message sent!", "success");
  };

  const now = Date.now();
  const activePosts = selectedCircle.posts.filter(p => p.fadeAt > now);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme === "dark" 
      ? "from-gray-900 via-blue-900 to-purple-900" 
      : "from-blue-200 via-white to-purple-200"
    } text-gray-900 dark:text-gray-100 transition-all duration-300`}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      <nav className={`sticky top-0 z-40 backdrop-blur-xl border-b ${
        theme === "dark" ? "bg-gray-800/80 border-white/10" : "bg-white/80 border-gray-300/30"
      }`} style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </motion.div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                WhisperCircles
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`p-2 rounded-xl transition-all backdrop-blur-sm shadow-sm ${
                  theme === "dark" ? "hover:bg-white/10 bg-white/5" : "hover:bg-gray-100/80 bg-gray-100/50"
                }`}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowProfile(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all font-medium shadow-lg hover:shadow-xl"
              >
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                  {currentUser.avatar}
                </div>
                <span className="hidden sm:inline">{currentUser.name}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <div className={`backdrop-blur-xl rounded-2xl shadow-xl border p-6 sticky top-24 ${
              theme === "dark" ? "bg-gray-800/40 border-white/10" : "bg-white/80 border-gray-300/50"
            }`} style={{ fontFamily: 'Inter, sans-serif' }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Your Circles</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    if (circles.length < 5) {
                      setCircles(prev => [...prev, {
                        id: Date.now(),
                        name: `Circle ${prev.length + 1}`,
                        description: "A new whisper circle for meaningful conversations",
                        members: [currentUser],
                        posts: [],
                        createdAt: Date.now(),
                        isPrivate: false,
                      }]);
                      showToast("New circle created!", "success");
                    } else {
                      showToast("Maximum 5 circles allowed", "error");
                    }
                  }}
                  disabled={circles.length >= 5}
                  className="p-2 text-blue-600 hover:bg-blue-50/80 dark:hover:bg-blue-900/20 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm shadow-sm"
                  title="Create new circle"
                >
                  <Plus size={18} />
                </motion.button>
              </div>
              
              <div className="space-y-2">
                {circles.map((circle, index) => (
                  <motion.button
                    key={circle.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCircle(circle)}
                    className={`w-full text-left p-3 rounded-xl transition-all backdrop-blur-sm shadow-sm ${
                      circle.id === selectedCircle.id
                        ? "bg-blue-500/20 border border-blue-400/40 text-blue-900 dark:text-blue-100"
                        : `hover:bg-white/50 dark:hover:bg-white/10 border border-transparent ${
                            theme === "dark" ? "hover:border-white/10" : "hover:border-gray-300/40"
                          }`
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate">{circle.name}</div>
                        <div className="text-sm opacity-70 flex items-center gap-2">
                          <Users size={12} />
                          <span>{circle.members.length} members</span>
                          {analyzeMood(circle.posts)}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </aside>

          <main className="lg:col-span-6">
            <div className="space-y-6" style={{ fontFamily: 'Inter, sans-serif' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`backdrop-blur-xl rounded-2xl shadow-xl border p-6 ${
                  theme === "dark" ? "bg-gray-800/40 border-white/10" : "bg-white/80 border-gray-300/50"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 gap-4">
                  <div>
                    <h1 className="text-2xl font-bold flex items-center gap-3">
                      {selectedCircle.name}
                      <span className="text-2xl" title="Circle mood">{analyzeMood(selectedCircle.posts)}</span>
                    </h1>
                    <p className="opacity-70 mt-1">{selectedCircle.description}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowAddMembers(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-all font-medium shadow-lg hover:shadow-xl whitespace-nowrap"
                  >
                    <UserPlus size={16} />
                    Add Members
                  </motion.button>
                </div>
                
                <div className="flex items-center gap-2 flex-wrap">
                  {selectedCircle.members.slice(0, 5).map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm ${
                        theme === "dark" ? "bg-gray-700/60 hover:bg-gray-600/60" : "bg-gray-100/70 hover:bg-gray-200/70"
                      } transition-all cursor-pointer`}
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {member.avatar}
                      </div>
                      <span className="text-sm font-medium">{member.name}</span>
                    </motion.div>
                  ))}
                  {selectedCircle.members.length > 5 && (
                    <span className="text-sm opacity-70">
                      +{selectedCircle.members.length - 5} more
                    </span>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`backdrop-blur-xl rounded-2xl shadow-xl border p-6 ${
                  theme === "dark" ? "bg-gray-800/40 border-white/10" : "bg-white/80 border-gray-300/50"
                }`}
              >
                <form onSubmit={(e) => {
                  e.preventDefault();
                  if (showPoll) {
                    const validOptions = pollOptions.filter(Boolean);
                    if (validOptions.length < 2 || !pollQuestion.trim()) {
                      showToast("Poll needs a question and at least 2 options", "error");
                      return;
                    }
                    handleAddPost("poll", `${pollQuestion}|${validOptions.join("|")}`);
                  } else if (audioBlob) {
                    handleAddPost("voice", "[Voice nudge]");
                  } else {
                    if (!newPost.trim()) {
                      showToast("Please enter some content", "error");
                      return;
                    }
                    handleAddPost("text", newPost.trim());
                  }
                }} className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setShowPoll(!showPoll)}
                      className={`px-4 py-2 rounded-xl font-medium transition-all backdrop-blur-sm flex items-center gap-2 shadow-sm ${
                        showPoll
                          ? "bg-blue-600 text-white shadow-lg"
                          : `${theme === "dark" 
                              ? "bg-gray-700/60 text-gray-300 hover:bg-gray-600/60 border border-gray-600/40" 
                              : "bg-gray-100/70 text-gray-700 hover:bg-gray-200/70 border border-gray-300/40"
                            }`
                      }`}
                    >
                      <BarChart3 size={16} />
                      {showPoll ? "Cancel Poll" : "Create Poll"}
                    </motion.button>
                    
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        onClick={recording ? stopRecording : startRecording}
                        disabled={audioBlob !== null}
                        className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 backdrop-blur-sm shadow-sm ${
                          recording
                            ? "bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/40"
                            : audioBlob
                            ? "bg-green-500/20 text-green-600 dark:text-green-400 border border-green-500/40"
                            : `${theme === "dark" 
                                ? "bg-gray-700/60 text-gray-300 hover:bg-gray-600/60 border border-gray-600/40" 
                                : "bg-gray-100/70 text-gray-700 hover:bg-gray-200/70 border border-gray-300/40"
                              }`
                        }`}
                      >
                        {recording ? (
                          <>
                            <Square size={16} />
                            <span className="hidden sm:inline">Stop ({recordingDuration - recordingTime}s)</span>
                            <span className="sm:hidden">{recordingDuration - recordingTime}s</span>
                          </>
                        ) : audioBlob ? (
                          <>
                            <Headphones size={16} />
                            <span className="hidden sm:inline">Recorded</span>
                          </>
                        ) : (
                          <>
                            <Mic size={16} />
                            <span className="hidden sm:inline">Voice Nudge</span>
                          </>
                        )}
                      </motion.button>
                      
                      {!recording && !audioBlob && (
                        <select
                          value={recordingDuration}
                          onChange={(e) => setRecordingDuration(Number(e.target.value))}
                          className={`px-3 py-2 rounded-xl border text-sm backdrop-blur-sm shadow-sm ${
                            theme === "dark" ? "border-white/20 bg-gray-800/60 text-gray-100" : "border-gray-300/40 bg-white/60 text-gray-900"
                          }`}
                        >
                          <option value={10}>10s</option>
                          <option value={30}>30s</option>
                          <option value={60}>60s</option>
                          <option value={120}>2min</option>
                        </select>
                      )}
                    </div>
                  </div>

                  {recordingError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-600 dark:text-red-400 text-sm bg-red-500/10 border border-red-500/30 p-3 rounded-xl backdrop-blur-sm"
                    >
                      {recordingError}
                    </motion.div>
                  )}

                  {!showPoll && !audioBlob && (
                    <textarea
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      placeholder="Share something meaningful with your circle..."
                      className={`w-full px-4 py-3 border rounded-xl resize-none backdrop-blur-sm focus:ring-2 focus:ring-blue-500/50 focus:border-transparent outline-none transition-all shadow-sm ${
                        theme === "dark" 
                          ? "border-white/20 bg-gray-800/60 text-gray-100 placeholder-gray-400" 
                          : "border-gray-300/50 bg-white/70 text-gray-900 placeholder-gray-500"
                      }`}
                      rows={3}
                      maxLength={500}
                    />
                  )}

                  {showPoll && (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={pollQuestion}
                        onChange={(e) => setPollQuestion(e.target.value)}
                        placeholder="What's your poll question?"
                        className={`w-full px-4 py-3 border rounded-xl backdrop-blur-sm focus:ring-2 focus:ring-blue-500/50 focus:border-transparent outline-none transition-all font-medium shadow-sm ${
                          theme === "dark" 
                            ? "border-white/20 bg-gray-800/60 text-gray-100 placeholder-gray-400" 
                            : "border-gray-300/50 bg-white/70 text-gray-900 placeholder-gray-500"
                        }`}
                      />
                      {pollOptions.map((option, idx) => (
                        <input
                          key={idx}
                          type="text"
                          value={option}
                          onChange={(e) => setPollOptions(opts => opts.map((o, i) => i === idx ? e.target.value : o))}
                          placeholder={`Option ${idx + 1}`}
                          className={`w-full px-4 py-2 border rounded-xl backdrop-blur-sm focus:ring-2 focus:ring-blue-500/50 focus:border-transparent outline-none transition-all shadow-sm ${
                            theme === "dark" 
                              ? "border-white/20 bg-gray-800/60 text-gray-100 placeholder-gray-400" 
                              : "border-gray-300/50 bg-white/70 text-gray-900 placeholder-gray-500"
                          }`}
                        />
                      ))}
                      {pollOptions.length < 5 && (
                        <button
                          type="button"
                          onClick={() => setPollOptions(opts => [...opts, ""])}
                          className="text-blue-600 dark:text-blue-400 text-sm hover:underline font-medium"
                        >
                          + Add Option
                        </button>
                      )}
                    </div>
                  )}

                  {audioBlob && (
                    <VoicePlayer audioBlob={audioBlob} onRemove={() => setAudioBlob(null)} showRemove={true} />
                  )}

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Clock size={16} className="opacity-70" />
                      <span className="text-sm font-medium">Fade after:</span>
                      <CustomSelect options={fadeOptions} value={fadeMs} onChange={setFadeMs} />
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={posting || (!newPost.trim() && !audioBlob && (!showPoll || !pollQuestion.trim() || pollOptions.filter(Boolean).length < 2))}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg hover:shadow-xl"
                    >
                      {posting && <Loader size={16} className="animate-spin" />}
                      {posting ? "Posting..." : showPoll ? "Create Poll" : audioBlob ? "Send Nudge" : "Share"}
                    </motion.button>
                  </div>
                </form>
              </motion.div>

              <div className="space-y-4">
                <AnimatePresence>
                  {activePosts
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .map((post, index) => {
                      const fadePct = Math.max(0, Math.min(1, (post.fadeAt - now) / (post.fadeAt - post.createdAt)));
                      return (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: fadePct,
                            y: 0,
                            filter: `blur(${Math.max(0, (1 - fadePct) * 2)}px)`
                          }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ delay: index * 0.05 }}
                          className={`backdrop-blur-xl rounded-2xl shadow-xl border p-6 ${
                            theme === "dark" ? "bg-gray-800/40 border-white/10" : "bg-white/80 border-gray-300/50"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                              {post.user.avatar}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-semibold">{post.user.name}</span>
                                <span className="text-sm opacity-70">
                                  {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              
                              {post.type === "text" && (
                                <p className="leading-relaxed">{post.content}</p>
                              )}
                              
                              {post.type === "poll" && post.pollQuestion && post.pollOptions && (
                                <div className={`border rounded-xl overflow-hidden backdrop-blur-sm shadow-sm ${
                                  theme === "dark" ? "border-white/20 bg-gray-800/40" : "border-gray-300/50 bg-white/50"
                                }`}>
                                  <div className={`p-4 border-b ${
                                    theme === "dark" ? "border-white/10" : "border-gray-300/30"
                                  }`}>
                                    <h4 className="font-medium">{post.pollQuestion}</h4>
                                  </div>
                                  <div className="p-4 space-y-2">
                                    {post.pollOptions.map((option, idx) => {
                                      const votes = post.pollVotes?.[idx] || 0;
                                      const totalVotes = Object.values(post.pollVotes || {}).reduce((sum, v) => sum + v, 0);
                                      const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
                                      const userVoted = userPollVotes[post.id] === idx;
                                      
                                      return (
                                        <motion.button
                                          key={idx}
                                          whileHover={{ scale: userPollVotes[post.id] === undefined ? 1.01 : 1 }}
                                          whileTap={{ scale: 0.99 }}
                                          onClick={() => handlePollVote(post.id, idx)}
                                          disabled={userPollVotes[post.id] !== undefined}
                                          className={`w-full p-3 rounded-xl transition-all text-left relative overflow-hidden backdrop-blur-sm disabled:cursor-not-allowed shadow-sm ${
                                            userVoted
                                              ? "bg-blue-500/20 border border-blue-400/40"
                                              : userPollVotes[post.id] !== undefined
                                              ? `opacity-50 ${
                                                  theme === "dark" 
                                                    ? "bg-gray-700/40 border border-gray-600/40" 
                                                    : "bg-gray-100/50 border border-gray-300/40"
                                                }`
                                              : `${
                                                  theme === "dark" 
                                                    ? "bg-gray-700/60 hover:bg-gray-600/60 border border-gray-600/40" 
                                                    : "bg-gray-100/70 hover:bg-gray-200/70 border border-gray-300/40"
                                                } hover:border-blue-400/40`
                                          }`}
                                        >
                                          <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${percentage}%` }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="absolute left-0 top-0 bottom-0 bg-blue-500/20 opacity-50"
                                          />
                                          <div className="relative flex justify-between items-center">
                                            <span className="font-medium">{option}</span>
                                            <span className="text-sm opacity-70">
                                              {percentage}% ({votes})
                                            </span>
                                          </div>
                                        </motion.button>
                                      );
                                    })}
                                    <div className="text-xs opacity-70 text-center mt-2">
                                      {Object.values(post.pollVotes || {}).reduce((sum, v) => sum + v, 0)} total votes
                                    </div>
                                  </div>
                                </div>
                              )}
                              
                              {post.type === "voice" && post.audioBlob && (
                                <VoicePlayer audioBlob={post.audioBlob} />
                              )}
                              
                              <div className="flex items-center gap-4 mt-3 text-sm opacity-70">
                                <span className="flex items-center gap-1">
                                  <Clock size={14} />
                                  Fades out in {formatRemainingTime(post.fadeAt, now)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                </AnimatePresence>
                
                {activePosts.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`backdrop-blur-xl rounded-2xl shadow-xl border p-12 text-center ${
                      theme === "dark" ? "bg-gray-800/40 border-white/10" : "bg-white/80 border-gray-300/50"
                    }`}
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No whispers yet</h3>
                    <p className="opacity-70">Be the first to share something meaningful with your circle.</p>
                  </motion.div>
                )}
              </div>
            </div>
          </main>

          <aside className="lg:col-span-3">
            <div className={`backdrop-blur-xl rounded-2xl shadow-xl border sticky top-24 ${
              theme === "dark" ? "bg-gray-800/40 border-white/10" : "bg-white/80 border-gray-300/50"
            }`} style={{ fontFamily: 'Inter, sans-serif' }}>
              <div className="p-6 pb-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <MessageCircle size={18} />
                  Circle Chat
                </h3>
                
                <div className={`h-48 rounded-xl p-4 overflow-y-auto mb-4 space-y-2 backdrop-blur-sm border ${
                  theme === "dark" ? "bg-gray-900/60 border-white/10" : "bg-gray-50/80 border-gray-300/40"
                }`}>
                  {(chatMessages[selectedCircle.id] || []).map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`flex ${msg.from === currentUser.name ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-xl text-sm backdrop-blur-sm shadow-sm ${
                          msg.from === currentUser.name
                            ? "bg-blue-600 text-white"
                            : theme === "dark" 
                              ? "bg-gray-700/60 text-gray-100 border border-gray-600/30" 
                              : "bg-white/90 text-gray-900 border border-gray-300/40"
                        }`}
                      >
                        <div className="font-medium text-xs opacity-75 mb-1">{msg.from}</div>
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="px-6 pb-6">
                <form onSubmit={handleChatSubmit} className="flex gap-2 w-full">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Send a quick message..."
                    className={`flex-1 min-w-0 px-3 py-2 border rounded-xl backdrop-blur-sm focus:ring-2 focus:ring-blue-500/50 focus:border-transparent outline-none transition-all text-sm shadow-sm ${
                      theme === "dark" 
                        ? "border-white/20 bg-gray-800/60 text-gray-100 placeholder-gray-400" 
                        : "border-gray-300/50 bg-white/70 text-gray-900 placeholder-gray-500"
                    }`}
                    maxLength={200}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-all font-medium flex items-center justify-center shadow-lg hover:shadow-xl flex-shrink-0"
                  >
                    <Send size={16} />
                  </motion.button>
                </form>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <footer className={`mt-16 backdrop-blur-xl border-t ${
        theme === "dark" ? "bg-gray-900/60 border-white/10" : "bg-white/80 border-gray-300/30"
      }`} style={{ fontFamily: 'Inter, sans-serif' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  WhisperCircles
                </span>
              </div>
              <p className="opacity-80 mb-6 max-w-md leading-relaxed">
                Connect with close friends and like-minded individuals through meaningful conversations that fade away naturally, keeping interactions light and in the moment.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Twitter, href: "https://x.com/home", color: "text-blue-400" },
                  { icon: Instagram, href: "https://www.instagram.com/", color: "text-pink-400" },
                  { icon: Facebook, href: "https://www.facebook.com/", color: "text-blue-600" },
                  { icon: Linkedin, href: "https://in.linkedin.com/", color: "text-blue-700" }
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.href}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all backdrop-blur-sm shadow-sm ${
                      theme === "dark" ? "bg-white/10 hover:bg-white/20" : "bg-gray-100/70 hover:bg-gray-200/70"
                    } ${social.color}`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Features</h4>
              <ul className="space-y-3">
                {[
                  { name: "Whisper Circles", icon: Users },
                  { name: "Fade Out Posts", icon: Clock },
                  { name: "Voice Nudges", icon: Headphones },
                  { name: "Real-time Chat", icon: MessageCircle },
                  { name: "Dark Mode", icon: Moon }
                ].map((item) => (
                  <li key={item.name}>
                    <a href="#" className="opacity-80 hover:opacity-100 transition-opacity text-sm flex items-center gap-2">
                      <item.icon size={14} />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-lg">Company</h4>
              <ul className="space-y-3">
                {[
                  { name: "About Us", icon: Info },
                  { name: "Privacy Policy", icon: Shield },
                  { name: "Terms of Service", icon: Globe },
                  { name: "Contact", icon: Mail },
                  { name: "Support", icon: Heart }
                ].map((item) => (
                  <li key={item.name}>
                    <a href="#" className="opacity-80 hover:opacity-100 transition-opacity text-sm flex items-center gap-2">
                      <item.icon size={14} />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className={`mt-12 pt-6 border-t text-center ${
            theme === "dark" ? "border-white/10" : "border-gray-300/30"
          }`}>
            <p className="opacity-60 text-sm">
              © {new Date().getFullYear()} WhisperCircles. All rights reserved. Made with ❤️ for meaningful connections.
            </p>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showProfile && (
          <ProfileModal user={currentUser} onClose={() => setShowProfile(false)} />
        )}
        {showAddMembers && (
          <AddMembersModal 
            circle={selectedCircle} 
            onClose={() => setShowAddMembers(false)} 
            onAddMember={handleAddMember}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toastMessage && (
         <Toast key={toastMessage} message={toastMessage} type={toastType} onClose={() => setToastMessage(null)} />
        )}
      </AnimatePresence>
    </div>
    
  );
}

export default WhisperCircles;