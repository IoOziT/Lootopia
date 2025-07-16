export default function Profil() {
  return (
    <main className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white px-4 pt-10 pb-4 text-center relative">
        <div className="absolute left-4 top-10 text-sm">Settings</div>
        <h1 className="text-lg font-semibold">Profile</h1>
        <div className="absolute right-4 top-10 text-sm">Logout</div>

        <div className="mt-6 flex justify-center">
          <div className="rounded-full border-4 border-white w-24 h-24 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1624561172888-ac93c696e10c?auto=format&fit=crop&w=400&q=80"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <h2 className="mt-3 text-xl font-bold">Victoria77</h2>
      </div>

      {/* Wallet */}
      <section className="p-4 space-y-4">
        <div className="bg-white shadow-sm rounded-xl p-4 space-y-4 border">
          <div className="flex items-center gap-3">
            <span className="text-2xl">👛</span>
            <div>
              <p className="text-xs uppercase text-gray-500">Total Wallet Balance</p>
              <p className="text-xl font-semibold">₹1239.30</p>
            </div>
          </div>

          <div className="flex justify-between items-center border-t pt-3">
            <div>
              <p className="text-xs text-gray-500 uppercase">Deposit Balance</p>
              <p className="text-sm font-medium">$123</p>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-semibold">
              Add Money
            </button>
          </div>

          <div className="flex justify-between items-center border-t pt-3">
            <div>
              <p className="text-xs text-gray-500 uppercase">Winnings</p>
              <p className="text-sm font-medium">₹123</p>
            </div>
            <button className="border border-black text-black px-4 py-2 rounded-lg text-sm font-semibold">
              Withdraw
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="bg-white rounded-xl shadow-sm border divide-y">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">📕</span>
              <p className="text-sm font-medium">Rewards</p>
            </div>
            <span className="text-lg">›</span>
          </div>
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">💬</span>
              <p className="text-sm font-medium">Customer Care</p>
            </div>
            <button className="border border-black text-black px-4 py-1 rounded-lg text-sm font-semibold">
              Message
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
