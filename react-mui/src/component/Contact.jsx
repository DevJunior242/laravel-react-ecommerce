import {
  Box,
  Typography,
  Paper,
  Grid,
  useTheme,
  Card,
  CardContent,
  TextField,
  Button,
  Container,
  FormHelperText,
} from "@mui/material";
import { tokens } from "../theme";
import { useState } from "react";
import { Instance } from "../Api/Axios";
import ErrorGlobal from "../Api/ErrorGlobal";

function Contact() {
  const colors = tokens(useTheme().palette.mode);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddContact = async (e) => {
    e.preventDefault();
    setError({});
     
    try {
     const res = await Instance.post("api/contact", {
        name,
        email,
        message,
     });
       setSuccessMessage(res.data.message);
       setName("");
       setEmail("");
        setMessage("");
    } catch (error) {
     ErrorGlobal({ error, setError });
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "calc(100vh - 100px)",
        mt: 4,
        mx: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          minHeight: "calc(100vh - 100px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "40px",
              fontWeight: "bold",
            }}
          >
            Contactez nous, nous sommes disponibles pour tous les besoins
            d'informations
          </Typography>

          <Paper elevation={3}>
            <Box
              component="img"
              src="https://fadd820558.cbaul-cdnwnd.com/f69949b1ff54c822a030b7842403b865/200000005-d02dbd127c/contact.jpg"
              alt=""
              sx={{
                width: { xs: "380px", md: "auto" },
                display: "block",
                maxWidth: "100%",
                height: "auto",
                borderRadius: 2,
              }}
            />
          </Paper>
        </Box>
        <Container maxWidth="sm">
          <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Contactez nous
            </Typography>

            {successMessage && (
              <Typography textAlign={"center"} color={"green"}>
                {successMessage}
              </Typography>
            )}
            
            <form onSubmit={handleAddContact}>
              <TextField
                error={!!error.name}
                id="outlined-basic"
                label="Nom"
                fullWidth
                variant="outlined"
                size="small"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {error.name && (
                <FormHelperText error textAlign={"center"} color={"red"}>
                  {error.name[0]}
                </FormHelperText>
              )}
              <TextField
                error={!!error.email}
                id="outlined-basic"
                label="Email"
                fullWidth
                variant="outlined"
                size="small"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
               {error.email && (
                <FormHelperText error textAlign={"center"} color={"red"}>
                  {error.email[0]}
                </FormHelperText>
              )}
              <TextField
                error={!!error.message}
                id="outlined-basic"
                label="Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                size="small"
                margin="normal"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
                {error.message && (
                  <FormHelperText error textAlign={"center"} color={"red"}>
                    {error.message[0]}
                  </FormHelperText>
                )}
              <Button variant="contained" size="small" type="submit" sx={{ mt: 2 }}>
                Envoyer
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Contact;



