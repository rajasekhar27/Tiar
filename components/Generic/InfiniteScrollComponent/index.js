import { forwardRef } from "react";
import { useEffect, useState, cloneElement, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
// import Loader from "../../UI/Loader";

function InfiniteScrollComponent({
  lazyHook,
  loaderMessage,
  endMessage,
  height,
  customLoader,
  customEnd,
  children,
  loopKey,
  clearParent,
  parentClasses,
  hookParams,
  limit,
  emptyHandler,
  additionalElements,
  inverse,
  containerStyles,
  hideParent,
  dataLooper,
  initialElements,
}) {
  const initialLimit = limit ? limit : 20;

  const [hasMore, setHasMore] = useState(true);
  const [finalData, setFinalData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(itemSize ? itemSize : 9);
  const [itemsPerPage, setItemsPerPage] = useState(initialLimit);
  const [pageOffset, setPageOffset] = useState(0);

  const [lazyHookTrigger, { isFetching }] = lazyHook();

  const isInitialMount = useRef(true);

  const clearData = () => {
    setFinalData([]);
    setCurrentPage(1);
    setItemsPerPage(initialLimit);
    setPageOffset(0);
    lazyHookTrigger(
      hookParams
        ? {
            limit: itemsPerPage,
            offset: 0,
            ...hookParams,
          }
        : {
            limit: itemsPerPage,
            offset: 0,
          }
    ).then((res) => {
      if (res.data) {
        const data = [...res?.data?.results];
        setFinalData(data);
        if (!res.data?.next) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }
      }
    });
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      clearData();
    }
  }, [JSON.stringify(hookParams)]);

  useEffect(() => {
    if (!additionalElements) return;
    setFinalData([...additionalElements, ...finalData]);
  }, [JSON.stringify(additionalElements)]);

  const fetchData = (data) => {
    const nextOffset = currentPage * itemsPerPage;
    setPageOffset(nextOffset);
    setCurrentPage(currentPage + 1);

    lazyHookTrigger(
      hookParams
        ? {
            limit: itemsPerPage,
            offset: nextOffset,
            ...hookParams,
          }
        : {
            limit: itemsPerPage,
            offset: nextOffset,
          }
    ).then((res) => {
      if (res.data) {
        const data = [...finalData, ...res?.data?.results];
        setFinalData(data);

        if (!res.data?.next) {
          setHasMore(false);
        }
      }
    });
  };

  useEffect(() => {
    lazyHookTrigger(
      hookParams
        ? {
            limit: itemsPerPage,
            offset: pageOffset,
            ...hookParams,
          }
        : {
            limit: itemsPerPage,
            offset: pageOffset,
          }
    ).then((res) => {
      if (res.data) {
        const data = initialElements
          ? [...finalData, ...res?.data?.results, ...initialElements]
          : [...finalData, ...res?.data?.results];
        setFinalData(data);

        if (!res.data?.next) {
          setHasMore(false);
        }
      }
    });
  }, []);

  return (
    <InfiniteScroll
      dataLength={finalData.length} //This is important field to render the next data
      next={() => fetchData()}
      hasMore={hasMore}
      loader={
        // <div className="fixed w-full h-full top-0 bottom-0 right-0 left-0 grid place-items-center bg-black/50 z-20">
        <div className="w-full grid place-items-center">
          <span className="loader"></span>
        </div>
        // </div>
      }
      endMessage={
        customEnd ? customEnd : <EndMessage endMessage={endMessage} />
      }
      height={height ? height : 500}
      inverse={inverse ? inverse : false}
      style={containerStyles}
    >
      {hideParent ? (
        <>
          {finalData?.length === 0 ? (
            <div>
              {!isFetching && (emptyHandler ? emptyHandler : <p>No Data</p>)}
            </div>
          ) : (
            finalData?.map((d, idx) => {
              return cloneElement(children, {
                data: d,
                idx: idx,
                key: loopKey ? loopKey(d) : idx,
                dataLength: finalData.length,
                clearData: clearData,
                finalData: finalData,
              });
            })
          )}
        </>
      ) : (
        <div
          className={`${
            finalData?.length !== 0 &&
            (clearParent
              ? parentClasses
              : `flex flex-col space-y-3 ${parentClasses}`)
          }`}
        >
          {finalData?.length === 0 ? (
            <div>
              {!isFetching && (emptyHandler ? emptyHandler : <p>No Data</p>)}
            </div>
          ) : (
            finalData?.map((d, idx) => {
              return cloneElement(children, {
                data: d,
                idx: idx,
                key: loopKey ? loopKey(d) : idx,
                dataLength: finalData.length,
                clearData: clearData,
              });
            })
          )}
        </div>
      )}
    </InfiniteScroll>
  );
}

const Loader = ({ loaderMessage }) => {
  return <h4>{loaderMessage ? loaderMessage : "Loading..."}</h4>;
};

const EndMessage = ({ endMessage }) => {
  return (
    <p style={{ textAlign: "center" }}>
      <b>{endMessage ? endMessage : "Yay! You have seen it all"}</b>
    </p>
  );
};

export default InfiniteScrollComponent;
