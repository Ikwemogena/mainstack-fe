
export default function ProfileModal() {
  return (
    <div className="profile-modal">
      <div className="profile-modal__info">
        <p className="header__actions-menu-profile">OJ</p>
        <div className="">
          <p>Olivier Jones</p>
          <p>olivierjones@gmail.com</p>
        </div>
      </div>
      <div className="profile-modal__actions">
        <button>Settings</button>
        <button>Purchase History</button>
        <button>Logout</button>
        <button>Refer and earn</button>
        <button>integrations</button>
        <button>report bug</button>
        <button>switch account</button>
        <button>Sign out</button>
      </div>
    </div>
  )
}