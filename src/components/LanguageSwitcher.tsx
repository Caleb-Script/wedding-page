"use client";

import { Menu, MenuItem, Stack, Typography } from "@mui/material";
import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import React from "react";
import type { Locale } from "@/i18n/request";

const LOCALES: { code: Locale; label: string; flag: string }[] = [
  { code: "de-DE", label: "Deutsch", flag: "🇩🇪" },
  { code: "en-US", label: "English", flag: "🇬🇧" },
  { code: "it-IT", label: "Italiano", flag: "🇮🇹" },
  { code: "ak-GH", label: "Twi", flag: "🇬🇭" },
];
export default function LanguageSwitcher() {
  const router = useRouter();
  const locale = useLocale();

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) return;
    // biome-ignore lint/suspicious/noDocumentCookie: egal
    document.cookie = `locale=${nextLocale}; path=/; max-age=31536000`;
    handleClose();
    router.refresh();
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        onClick={handleOpen}
        sx={{
          cursor: "pointer",
          px: 1,
        }}
      >
        <Typography
          fontSize={14}
          fontWeight={600}
          sx={{
            letterSpacing: "0.05em",
          }}
        >
          {locale.slice(0, 2).toUpperCase()}
        </Typography>
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1.5,

            borderRadius: 3,

            backdropFilter: "blur(20px)",
            background: "rgba(255,255,255,0.85)",

            border: "1px solid rgba(212,175,55,0.35)",

            boxShadow: "0 20px 60px rgba(0,0,0,0.35)",

            overflow: "hidden",
          },
        }}
      >
        {LOCALES.map((l) => (
          <MenuItem key={l.code} onClick={() => switchLocale(l.code)}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ width: "100%", justifyContent: "space-between" }}
            >
              <Typography fontSize={14}>
                {" "}
                {l.flag} {l.label}
              </Typography>
              {locale === l.code && <CheckIcon fontSize="small" />}
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
