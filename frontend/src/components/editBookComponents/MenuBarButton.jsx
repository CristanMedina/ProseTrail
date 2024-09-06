const MenuBarButton = ({ onClick, isActive, icon: Icon }) => (
    <button onClick={onClick} className={isActive ? 'is-active' : ''}>
      <Icon />
    </button>
  );
  
  export default MenuBarButton;