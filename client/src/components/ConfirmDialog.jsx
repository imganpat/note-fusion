import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

const ConfirmDialog = ({
  title = "Permanently Delete Note?",
  description = "This note will be permanently removed and cannot be recovered. Are you sure you want to continue?",
  confirmText = "Delete",
  onConfirm,
}) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default ConfirmDialog;
