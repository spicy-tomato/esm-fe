/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        // UTC
        "utc-1": "#29166f",
        "utc-2": "#b7b3b2",
        "utc-3": "#f3d400",
        // Base
        "tui-base-01": "var(--tui-base-01)",
        "tui-base-02": "var(--tui-base-02)",
        "tui-base-03": "var(--tui-base-03)",
        "tui-base-04": "var(--tui-base-04)",
        "tui-base-09": "var(--tui-base-09)",
        "tui-clear": "var(--tui-clear)",
        "tui-primary": "var(--tui-primary)",
        // Text
        "tui-text-01": "var(--tui-text-01)",
        "tui-text-02": "var(--tui-text-02)",
        "tui-text-positive": "var(--tui-positive)",
        "tui-text-negative": "var(--tui-negative)",
        "tui-text-link": "var(--tui-link)",
        // Status
        "tui-success-fill": "var(--tui-success-fill)",
        "tui-success-bg": "var(--tui-success-bg)",
        "tui-success-bg-hover": "var(--tui-success-bg-hover)",
        "tui-warning-fill": "var(--tui-warning-fill)",
        "tui-warning-bg-hover": "var(--tui-warning-bg-hover)",
        "tui-error-fill": "var(--tui-error-fill)",
        "tui-error-bg": "var(--tui-error-bg)",
        "tui-error-bg-hover": "var(--tui-error-bg-hover)",
        "tui-neutral-fill": "var(--tui-neutral-fill)",
      },
    },
  },
  plugins: [],
};
