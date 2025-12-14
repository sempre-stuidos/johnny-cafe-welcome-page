interface MenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MenuToggle({ isOpen, onToggle }: MenuToggleProps) {
  return (
    <div className="menu-toggle-wrapper">
      <input
        id="menu-toggle"
        type="checkbox"
        checked={isOpen}
        onChange={onToggle}
        className="menu-toggle-input"
      />
      <label htmlFor="menu-toggle" className="menu-toggle-label">
        <div className="menu-toggle">
          <div className="menu-toggle-part"></div>
          <div className="menu-toggle-part"></div>
          <div className="menu-toggle-part"></div>
        </div>
      </label>
    </div>
  );
}
