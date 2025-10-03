interface ProfileAvatarProps {
  progress: number; // entre 0 et 100
  onClick?: () => void;
}

export default function ProfileAvatar({ progress, onClick }: ProfileAvatarProps) {
  const radius = 22;            // rayon du cercle
  const strokeWidth = 3;        // épaisseur du contour
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="profile-avatar" onClick={onClick}>
      <svg className="progress-ring" width="50" height="50">
        {/* Cercle gris (fond) */}
        <circle
          className="ring-bg"
          stroke="#e5e7eb" // gris clair
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx="25"
          cy="25"
        />
        {/* Cercle vert (progression) */}
        <circle
          className="ring-progress"
          stroke="#10b981" // vert
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx="25"
          cy="25"
        />
      </svg>
      <img
        src="/tannit3.png"
        alt="Avatar"
        className="avatar-img"
      />
    </div>
  );
}
