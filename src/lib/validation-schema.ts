import * as yup from "yup";

export const addFundSchema = yup.object().shape({
    nickname: yup
        .string()
        .required("Nickname is required")
        .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, underscores allowed"),
    amount: yup
        .number()
        .typeError("Amount is required")
        .required("Amount is required")
        .moreThan(0, "Amount must be greater than 0"),
});

export const addCampaignSchema = yup.object({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    goalAmount: yup.number().required("Goal is required").positive(),
    expiresAt: yup.string().required("Expiry date required"),
    ownerId: yup.number().required("Owner required"),
});