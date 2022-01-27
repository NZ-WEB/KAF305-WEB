import {TheProfileEditFormProps} from "./TheProfileEditForm.props";
import {CustomCurd} from "../CustomCard/CustomCurd";

export const TheProfileEditForm = ({...props}: TheProfileEditFormProps):JSX.Element => {
    return (
        <CustomCurd {...props}>
            123
        </CustomCurd>
    );
};