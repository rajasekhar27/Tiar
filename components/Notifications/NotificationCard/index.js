import moment from "moment/moment";

const NotificationCard = ({
  data,
  icon,
  buttonName,
  buttonClick,
  hideButton,
}) => {
  return (
    <div className="bg-white/20 min-h-[101px] rounded-xl p-3 animate__animated animate__zoomIn">
      <div className="flex items-start space-x-3">
        {icon}
        <p className="text-[14px] flex-1">{data?.message}</p>
        <p className="text-[12px] font-medium text-white/50 whitespace-nowrap">
          {data?.date_created && moment(data?.date_created).fromNow()}
        </p>
      </div>

      {!hideButton && (
        <div className="grid place-items-end mt-2">
          <button
            className="border border-ownOrange text-ownOrange rounded-full px-3 py-1 text-[13px] font-medium"
            onClick={() => buttonClick(data)}
          >
            {buttonName}
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
