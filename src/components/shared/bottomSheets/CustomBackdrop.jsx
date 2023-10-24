import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

const CustomBackdrop = (props) => {
  return (
    <BottomSheetBackdrop
      {...props}
      appearsOnIndex={(0, 1)}
      disappearsOnIndex={-1}
      pressBehavior={"close"}
      opacity={0.7}
    />
  );
};

export default CustomBackdrop;
