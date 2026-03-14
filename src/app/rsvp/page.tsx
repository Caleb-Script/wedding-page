"use client";

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { HiPlus, HiTrash } from "react-icons/hi2";
import { useTypedTranslations } from "@/i18n/useTypedTranslations";
import { countries } from "@/lib/countries";
import { validatePhone } from "@/lib/phone";

type PhoneType = "WHATSAPP" | "SMS" | "CALL";

type PhoneNumber = {
  phoneType: PhoneType;
  country: string;
  countryCode: string;
  number: string;
};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;

  phone: PhoneNumber;

  ceremony: boolean;
  reception: boolean;

  plusOnes: PlusOne[];
};

type PlusOne = {
  firstName: string;
  lastName: string;
};

export default function RSVPPage() {
  const t = useTypedTranslations("wedding");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      phone: {
        phoneType: "WHATSAPP",
        country: "DE",
        countryCode: "+49",
        number: "",
      },
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
        background: "linear-gradient(180deg,#faf7f2 0%,#f3efe8 100%)",
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
          {t("rsvpForm.title")}
        </Typography>

        {/* Divider */}
        <Box
          sx={{
            width: 70,
            height: 2,
            mx: "auto",
            mb: 10,
            background: "linear-gradient(135deg,#c89b3c,#e5c275)",
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
              label={t("rsvpForm.firstName")}
              fullWidth
              margin="normal"
              {...register("firstName")}
            />

            {/* Last Name */}
            <TextField
              label={t("rsvpForm.lastName")}
              fullWidth
              margin="normal"
              {...register("lastName")}
            />

            {/* Email */}
            <TextField
              label={t("rsvpForm.email")}
              fullWidth
              margin="normal"
              {...register("email")}
            />

            {/* Phone */}
            <Box sx={{ mt: 3 }}>
              <Typography
                sx={{
                  fontFamily: "var(--font-serif)",
                  mb: 1,
                }}
              >
                {t("rsvpForm.phone.title")}
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "120px 150px 1fr" },
                  gap: 2,
                }}
              >
                <TextField
                  select
                  label={t("rsvpForm.phone.type")}
                  SelectProps={{ native: true }}
                  {...register("phone.phoneType")}
                >
                  <option value="WHATSAPP">
                    {t("rsvpForm.phone.types.whatsapp")}
                  </option>
                  <option value="SMS">{t("rsvpForm.phone.types.sms")}</option>
                  <option value="CALL">{t("rsvpForm.phone.types.call")}</option>
                </TextField>

                <TextField
                  select
                  label={t("rsvpForm.phone.country")}
                  SelectProps={{ native: true }}
                  {...register("phone.country")}
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {t(`rsvpForm.phone.countries.${country.code}`)} (
                      {country.dial})
                    </option>
                  ))}
                </TextField>

                <TextField
                  label={t("rsvpForm.phone.number")}
                  error={!!errors.phone?.number}
                  helperText={errors.phone?.number?.message}
                  {...register("phone.number", {
                    validate: (value) => {
                      const selectedCountry = watch("phone.country");
                      const country = countries.find(
                        (c) => c.code === selectedCountry,
                      );

                      if (!country) {
                        return t("rsvpForm.phone.errors.invalidCountry");
                      }

                      return (
                        validatePhone(country.dial, value) ||
                        t("rsvpForm.phone.errors.invalidNumber")
                      );
                    },
                  })}
                />
              </Box>
            </Box>

            {/* Attendance */}
            <Box sx={{ mt: 3 }}>
              <Typography
                sx={{
                  fontFamily: "var(--font-serif)",
                  mb: 1,
                }}
              >
                {t("rsvpForm.attendance")}
              </Typography>

              <FormControlLabel
                control={<Checkbox {...register("ceremony")} />}
                label={t("rsvpForm.ceremony")}
              />

              <FormControlLabel
                control={<Checkbox {...register("reception")} />}
                label={t("rsvpForm.reception")}
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
                  {t("rsvpForm.plusOnes")}
                </Typography>

                <IconButton
                  onClick={() =>
                    append({
                      firstName: "",
                      lastName: "",
                    })
                  }
                  sx={{
                    background: "linear-gradient(135deg,#c89b3c,#e5c275)",
                    color: "white",
                    "&:hover": {
                      background: "linear-gradient(135deg,#b8892e,#d8b25f)",
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
                    label={t("rsvpForm.firstName")}
                    {...register(`plusOnes.${index}.firstName`)}
                  />

                  <TextField
                    label={t("rsvpForm.lastName")}
                    {...register(`plusOnes.${index}.lastName`)}
                  />

                  <IconButton onClick={() => remove(index)} sx={{ mt: 1 }}>
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
                  background: "linear-gradient(135deg,#c89b3c,#e5c275)",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                {t("rsvpForm.submit")}
              </Button>
            </Box>
          </Box>
        </motion.form>
      </Container>
    </Box>
  );
}
