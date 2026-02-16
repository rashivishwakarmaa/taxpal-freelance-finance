import DashboardLayout from '../components/DashboardLayout';

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Settings</h1>
          <p className="text-slate-400 mt-1">Manage your account and preferences</p>
        </div>
        <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Profile</h2>
            <p className="text-slate-400 text-sm">Update your profile information (coming soon).</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Tax Settings</h2>
            <p className="text-slate-400 text-sm">Configure tax rates and filing status (coming soon).</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">Notifications</h2>
            <p className="text-slate-400 text-sm">Manage email and in-app notifications (coming soon).</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
