"use client";

import { motion } from "framer-motion";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { HiPlus, HiTrash } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";

type PlusOne = {
  firstName: string;
  lastName: string;
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  ceremony: boolean;
  reception: boolean;
  plusOnes: PlusOne[];
};

export default function RSVPPage() {
  const router = useRouter();
  const { register, handleSubmit, control } = useForm<FormData>({
    defaultValues: {
      plusOnes: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "plusOnes",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);

  router.push("/rsvp/success");
  };

  return (
    <Box
      sx={{
        py: { xs: 14, md: 20 },
        px: 3,
        background:
          "linear-gradient(180deg,#faf7f2 0%,#f3efe8 100%)",
      }}
    >
      <Container maxWidth="sm">

        {/* Title */}
        <Typography
          sx={{
            textAlign: "center",
            fontFamily: "var(--font-serif)",
            fontSize: { xs: "2.5rem", md: "3.5rem" },
            mb: 2,
          }}
        >
          RSVP
        </Typography>

        {/* Divider */}
        <Box
          sx={{
            width: 70,
            height: 2,
            mx: "auto",
            mb: 10,
            background:
              "linear-gradient(135deg,#c89b3c,#e5c275)",
          }}
        />

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              px: 6,
              py: 6,
              borderRadius: "16px",
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(0,0,0,0.05)",
              boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
            }}
          >

            {/* First Name */}
            <TextField
              label="First Name"
              fullWidth
              margin="normal"
              {...register("firstName")}
            />

            {/* Last Name */}
            <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              {...register("lastName")}
            />

            {/* Email */}
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              {...register("email")}
            />

            {/* Attendance */}
            <Box sx={{ mt: 3 }}>

              <Typography
                sx={{
                  fontFamily: "var(--font-serif)",
                  mb: 1,
                }}
              >
                I will attend:
              </Typography>

              <FormControlLabel
                control={<Checkbox {...register("ceremony")} />}
                label="Ceremony"
              />

              <FormControlLabel
                control={<Checkbox {...register("reception")} />}
                label="Reception"
              />

            </Box>

            {/* Plus Ones */}
            <Box sx={{ mt: 4 }}>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mb: 2,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.2rem",
                  }}
                >
                  Plus Ones
                </Typography>

                <IconButton
                  onClick={() =>
                    append({
                      firstName: "",
                      lastName: "",
                    })
                  }
                  sx={{
                    background:
                      "linear-gradient(135deg,#c89b3c,#e5c275)",
                    color: "white",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg,#b8892e,#d8b25f)",
                    },
                  }}
                >
                  <HiPlus />
                </IconButton>
              </Box>

              {fields.map((field, index) => (
                <Box
                  key={field.id}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr auto",
                    gap: 2,
                    mb: 2,
                  }}
                >
                  <TextField
                    label="First Name"
                    {...register(`plusOnes.${index}.firstName`)}
                  />

                  <TextField
                    label="Last Name"
                    {...register(`plusOnes.${index}.lastName`)}
                  />

                  <IconButton
                    onClick={() => remove(index)}
                    sx={{ mt: 1 }}
                  >
                    <HiTrash />
                  </IconButton>
                </Box>
              ))}
            </Box>

            {/* Submit */}
            <Box sx={{ textAlign: "center", mt: 5 }}>
              <Button
                type="submit"
                sx={{
                  px: 6,
                  py: 1.5,
                  color: "white",
                  background:
                    "linear-gradient(135deg,#c89b3c,#e5c275)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Send RSVP
              </Button>
            </Box>

          </Box>
        </motion.form>

      </Container>
    </Box>
  );
}