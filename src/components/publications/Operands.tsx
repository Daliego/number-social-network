import { useFormik } from "formik";
import { Input } from "../@shared/Input";
import useCreateComments from "../../hooks/comments/useCreateComments";
import { Operations } from "../../models/Comments";

interface OperandsProps {
  publicationId: string;
  userId?: string;
  replyType: "publication" | "reply";
  predecessorId?: string;
}

export function Operands({
  publicationId,
  userId,
  predecessorId,
}: OperandsProps) {
  const { mutateAsync: createComment } = useCreateComments();

  const formik = useFormik({
    initialValues: {
      text: "",
      operation: "addition",
    },
    onSubmit: (values) => {
      console.log("Form values:", values);

      //   if (replyType === "publication") {
      createComment({
        text: values.text,
        operation: values.operation as Operations,
        publicationId: publicationId,
        userId: userId!,
        predecessorId: predecessorId ?? undefined,
      });
      //   }
    },
  });

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    console.log("o valor seleciionado", selectedValue);
    formik.setFieldValue("operation", selectedValue);
  };

  if (!userId) {
    return <div></div>;
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{ display: "flex", gap: "10px" }}
    >
      <select onSelect={handleSelect}>
        <option value="addition">+</option>
        <option value="subtraction">-</option>
        <option value="multiplication">*</option>
        <option value="division">/</option>
      </select>
      <Input
        formikAndName={{
          formik,
          name: "text",
        }}
      />
    </form>
  );
}
