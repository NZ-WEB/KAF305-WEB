import {Card} from "@mui/material";
import {CustomCardProps} from "./CustomCard.props";

export const CustomCurd = ({children}: CustomCardProps): JSX.Element => {
    return (
        <Card
            sx={{
                borderRadius: "20px",
                background: "linear-gradient(126.97deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
                padding: "28px 21px",
                backdropFilter: "blur(120px)",
                color: "#fff"
        }}
        >
            {children}
        </Card>
    );
};