import {AppButtonProps} from "./AppButton.props";
import {Button} from "@mui/material";

export const AppButton = ({outlined, type="button", filled, children, ...props}: AppButtonProps): JSX.Element => {
    if (outlined) {
        return (
            <button type={type} style={{display:"inline", outline: "none", border: "none", background: "transparent"}} {...props} >
                <Button color="primary" variant="outlined" sx={{
                    borderRadius: "12px",
                }}>
                    {children}
                </Button>
            </button>
        );
    } else if (filled) {
        return (
            <Button {...props} color="action" variant="contained" sx={{
                borderRadius: "12px",
            }}>
                {children}
            </Button>
        );
    } else {
        return (
            <Button {...props} color="primary" sx={{
                borderRadius: "12px",
            }}>
                {children}
            </Button>
        );
    }
};