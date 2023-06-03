const InviteFriends = (props) => {
  return (
    <div className="px-5">
      {Array(10)
        .fill(10)
        .map((i, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-3 border-b border-white/50"
          >
            <div className="flex items-center space-x-3 ">
              <div className="w-[36px] h-[36px] rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bWFsZSUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                  alt=""
                  className=""
                />
              </div>

              <h5 className="text-[14px] font-medium">SUDHEER HUNTERS</h5>
            </div>

            <button className="bg-[#00B929] w-[65px] p-1 rounded-md text-[12px] font-semibold">
              Invite
            </button>
          </div>
        ))}
    </div>
  );
};

export default InviteFriends;
