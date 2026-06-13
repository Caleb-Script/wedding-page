"use client";

import { Fab, Menu, MenuItem, Stack, Typography } from "@mui/material";
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
  const activeLocale = LOCALES.find((item) => item.code.startsWith(locale));

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const switchLocale = (nextLocale: Locale) => {
    if (nextLocale === activeLocale?.code) return;
    // biome-ignore lint/suspicious/noDocumentCookie: egal
    document.cookie = `locale=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    handleClose();
    router.refresh();
  };

  return (
    <>
      <Fab
        aria-controls={open ? "language-menu" : undefined}
        aria-expanded={open}
        aria-label="language"
        aria-haspopup="menu"
        onClick={handleOpen}
        sx={{
          width: 46,
          minWidth: 46,
          height: 46,
          color: "#fff",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          background: "rgba(8, 10, 13, 0.28)",
          boxShadow: "inset 0 1px rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(18px) saturate(140%)",
          "&:hover": {
            background: "rgba(20, 21, 24, 0.52)",
          },
        }}
      >
        <Typography
          sx={{
            color: "inherit",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.05em",
          }}
        >
          {locale.slice(0, 2).toUpperCase()}
        </Typography>
      </Fab>

      <Menu
        anchorEl={anchorEl}
        id="language-menu"
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1.5,
              minWidth: 190,
              borderRadius: 2,
              color: "rgba(255,255,255,.78)",
              backdropFilter: "blur(24px) saturate(140%)",
              background: "rgba(9,10,12,.9)",
              border: "1px solid rgba(255,255,255,.12)",
              boxShadow: "0 22px 70px rgba(0,0,0,.48)",
              overflow: "hidden",
              "& .MuiMenuItem-root": {
                minHeight: 48,
                mx: 0.5,
                my: 0.25,
                borderRadius: 1.5,
                transition: "background 180ms ease",
              },
              "& .MuiMenuItem-root:hover": {
                background: "rgba(216,184,121,.1)",
              },
            },
          },
        }}
      >
        {LOCALES.map((l) => (
          <MenuItem key={l.code} onClick={() => switchLocale(l.code)}>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: 14 }}>
                {l.flag} {l.label}
              </Typography>
              {activeLocale?.code === l.code && (
                <CheckIcon color="#d8b879" size={15} />
              )}
            </Stack>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
