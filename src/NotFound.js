import { Button, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <>
            <Container
                sx={{p:4}}
            >
                <Box sx={{p:2, textAlign: 'center'}}>
                    <Typography variant="h2">Oops! </Typography>
                </Box>
                <Box sx={{p:2, textAlign: 'center'}}>
                    <Typography>This page you are looking for don't seems to exist...yet!</Typography>
                    <Box sx={{p:2, textAlign: 'center'}}>
                        <Button
                            variant="contained"
                            onClick={() => navigate('/')}
                        >
                            Back to Home
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default NotFound;