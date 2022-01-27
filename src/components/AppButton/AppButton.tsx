import {AppButtonProps} from "./AppButton.props";
import {Button} from "@mui/material";

export const AppButton = ({outlined, filled, children, ...props}:AppButtonProps):JSX.Element => {
    if (outlined) {
        return (
            <Button {...props} color="primary" variant="outlined" sx={{
                borderRadius: "12px",
            }} >
                {children}
            </Button>
        );
    } else if (filled) {
        return (
            <Button {...props} color="action" variant="contained" sx={{
                borderRadius: "12px",
            }} >
                {children}
            </Button>
        );
    } else {
        return (
            <Button {...props} color="primary" sx={{
                borderRadius: "12px",
            }} >
                {children}
            </Button>
        );
    }
};