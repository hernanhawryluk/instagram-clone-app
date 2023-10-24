import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const TransparentBackdrop = (props) => {
  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={(0, 1)}
      disappearsOnIndex={-1}
      pressBehavior={"close"}
      opacity={0.1}
    />
  );
};

export default TransparentBackdrop;
