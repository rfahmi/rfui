import { useState, useCallback } from "react";
import {
  HudPage,
  HudBackground,
  PanelCorners,
  PanelHeader,
  HudTextField,
  HudToggle,
  HudTrackpad,
  SpeechBubble,
  HudSelect,
  HudCheckbox,
  HudCheckboxGroup,
  HudNavBar,
  HudGrid,
  HudGridItem,
  HudFolder,
  HudDocument,
} from "../src";
import { colors, fontSizes, spacing } from "../src/tokens";
import { panelStyle } from "../src/styles";

/* ── helpers ──────────────────────────────────────────── */
const section = (style?: React.CSSProperties): React.CSSProperties => ({
  marginBottom: spacing.xxl * 1.5,
  ...style,
});

const grid = (cols: number): React.CSSProperties => ({
  display: "grid",
  gridTemplateColumns: `repeat(${cols}, 1fr)`,
  gap: spacing.xl,
});

const label = (extra?: React.CSSProperties): React.CSSProperties => ({
  fontSize: fontSizes.xs,
  color: colors.dim,
  textTransform: "uppercase" as const,
  letterSpacing: "0.1em",
  marginBottom: spacing.sm,
  display: "block",
  ...extra,
});

const tag: React.CSSProperties = {
  display: "inline-block",
  padding: `${spacing.xs}px ${spacing.sm}px`,
  border: `1px solid ${colors.border}`,
  color: colors.dim,
  fontSize: fontSizes.xs,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  marginRight: spacing.xs,
  marginBottom: spacing.xs,
};

/* ── component ────────────────────────────────────────── */
export default function App() {
  /* HudTextField state */
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("Pre-filled value");
  const [submitted, setSubmitted] = useState<string | null>(null);

  /* HudToggle state */
  const [tog1, setTog1] = useState(false);
  const [tog2, setTog2] = useState(true);
  const [tog3, setTog3] = useState(false);

  /* HudTrackpad state */
  const [pos1, setPos1] = useState({ x: 0, y: 0 });
  const [pos2, setPos2] = useState({ x: -0.4, y: 0.6 });

  /* SpeechBubble state */
  const [bubbleVisible, setBubbleVisible] = useState(true);
  const [bubbleText, setBubbleText] = useState("Hello from the HUD!");

  /* HudSelect state */
  const [selectVal, setSelectVal] = useState("");
  const [selectVal2, setSelectVal2] = useState("bravo");

  /* HudCheckbox state */
  const [chk1, setChk1] = useState(false);
  const [chk2, setChk2] = useState(true);
  const [chkGroup, setChkGroup] = useState<string[]>(["radar", "drive"]);

  /* Multiline state */
  const [mlText, setMlText] = useState("");
  const [mlSubmitted, setMlSubmitted] = useState("");

  /* HudNavBar state */
  const [navActive, setNavActive] = useState("dashboard");

  /* HudFolder state */
  const [folderActive, setFolderActive] = useState<string>("sector16");

  /* HudDocument state */
  const [docActive, setDocActive] = useState<string>("brief");

  const handleSubmit = useCallback(() => {
    if (text1.trim()) {
      setSubmitted(text1);
      setText1("");
    }
  }, [text1]);

  return (
    <HudPage maxWidth={1100}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <div style={{ marginBottom: spacing.xxl * 2, paddingBottom: spacing.xl, borderBottom: `1px solid ${colors.border}` }}>
        <div style={{ fontSize: fontSizes.xs, color: colors.dim, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: spacing.md }}>
          ◆ RFUI
        </div>
        <h1 style={{ fontSize: fontSizes.title, color: colors.hi, fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: spacing.lg }}>
          Component Showcase
        </h1>
        <p style={{ color: colors.text, maxWidth: 560, lineHeight: 1.7 }}>
          A military-grade steel-blue design language for React. All components
          follow a monochrome HUD aesthetic with subtle animations and a
          consistent token system.
        </p>
        <div style={{ marginTop: spacing.xl }}>
          {["HudBackground", "HudPage", "PanelCorners", "PanelHeader", "HudTextField", "HudToggle", "HudTrackpad", "SpeechBubble", "HudSelect", "HudCheckbox", "HudCheckboxGroup", "HudNavBar", "HudGrid", "HudGridItem", "HudFolder", "HudDocument"].map((c) => (
            <span key={c} style={tag}>{c}</span>
          ))}
        </div>
      </div>

      {/* ── HudBackground ────────────────────────────────── */}
      <div style={section()}>
        <PanelHeader>HudBackground</PanelHeader>
        <div style={{ ...panelStyle, position: "relative", overflow: "hidden", height: 200 }}>
          <HudBackground />
          <PanelCorners />
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100%", gap: spacing.sm }}>
            <span style={{ color: colors.hi, fontSize: fontSizes.base, textTransform: "uppercase", letterSpacing: "0.15em" }}>
              Dotted grid · Ambient gradient · Vignette
            </span>
            <span style={{ color: colors.dim, fontSize: fontSizes.xs, letterSpacing: "0.08em" }}>
              Three fixed overlay layers — mount once at page root
            </span>
          </div>
        </div>
      </div>

      {/* ── PanelCorners + PanelHeader ────────────────────── */}
      <div style={section()}>
        <PanelHeader>PanelCorners &amp; PanelHeader</PanelHeader>
        <div style={grid(2)}>
          {/* PanelCorners demo */}
          <div>
            <span style={label()}>PanelCorners</span>
            <div style={{ ...panelStyle, height: 140, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <PanelCorners />
              <span style={{ color: colors.dim, fontSize: fontSizes.xs, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                L-shaped corner accents
              </span>
            </div>
          </div>

          {/* PanelHeader demo */}
          <div>
            <span style={label()}>PanelHeader</span>
            <div style={panelStyle}>
              <PanelCorners />
              <PanelHeader>Entity Viewer</PanelHeader>
              <div style={{ color: colors.text, fontSize: fontSizes.sm }}>
                ◆ diamond glyph · uppercase label · bottom separator
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── HudTextField ─────────────────────────────────── */}
      <div style={section()}>
        <PanelHeader>HudTextField</PanelHeader>
        <div style={grid(2)}>
          {/* Basic input */}
          <div style={panelStyle}>
            <PanelCorners />
            <span style={label({ marginBottom: spacing.lg })}>Basic input</span>
            <HudTextField
              label="Message"
              value={text1}
              onChange={setText1}
              placeholder="Type something…"
              submitLabel="SEND"
              onSubmit={handleSubmit}
            />
            {submitted && (
              <div style={{ marginTop: spacing.md, color: colors.mid, fontSize: fontSizes.xs, borderLeft: `2px solid ${colors.border}`, paddingLeft: spacing.sm }}>
                Submitted: {submitted}
              </div>
            )}
          </div>

          {/* Pre-filled + disabled */}
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.lg }}>
            <div style={panelStyle}>
              <PanelCorners />
              <span style={label({ marginBottom: spacing.lg })}>Pre-filled value</span>
              <HudTextField
                label="Callsign"
                value={text2}
                onChange={setText2}
              />
            </div>
            <div style={panelStyle}>
              <PanelCorners />
              <span style={label({ marginBottom: spacing.lg })}>Disabled state</span>
              <HudTextField
                label="Locked"
                value="SYSTEM LOCKED"
                onChange={() => {}}
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── HudToggle ────────────────────────────────────── */}
      <div style={section()}>
        <PanelHeader>HudToggle</PanelHeader>
        <div style={grid(3)}>
          <div style={panelStyle}>
            <PanelCorners />
            <span style={label({ marginBottom: spacing.lg })}>Off → on</span>
            <HudToggle
              value={tog1}
              onChange={setTog1}
              label="ACTIVE"
              offLabel="INACTIVE"
            />
          </div>
          <div style={panelStyle}>
            <PanelCorners />
            <span style={label({ marginBottom: spacing.lg })}>Pre-enabled</span>
            <HudToggle
              value={tog2}
              onChange={setTog2}
              label="SHIELDS UP"
              offLabel="SHIELDS DOWN"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
            <div style={panelStyle}>
              <PanelCorners />
              <span style={label({ marginBottom: spacing.lg })}>Disabled</span>
              <HudToggle value={false} onChange={() => {}} label="OFFLINE" disabled />
            </div>
            <div style={panelStyle}>
              <PanelCorners />
              <span style={label({ marginBottom: spacing.lg })}>Stacked</span>
              <div style={{ display: "flex", flexDirection: "column", gap: spacing.sm }}>
                <HudToggle value={tog3} onChange={setTog3} label="RADAR" offLabel="RADAR" />
                <HudToggle value={!tog3} onChange={(v) => setTog3(!v)} label="CLOAK" offLabel="CLOAK" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── HudTrackpad ──────────────────────────────────── */}
      <div style={section()}>
        <PanelHeader>HudTrackpad</PanelHeader>
        <div style={grid(2)}>
          <div style={panelStyle}>
            <PanelCorners />
            <span style={label({ marginBottom: spacing.lg })}>Full readout + axis labels</span>
            <HudTrackpad
              value={pos1}
              onChange={setPos1}
              label="Gaze Direction"
              showAxisLabels
              showReadout
            />
          </div>
          <div style={panelStyle}>
            <PanelCorners />
            <span style={label({ marginBottom: spacing.lg })}>No readout, pre-positioned</span>
            <HudTrackpad
              value={pos2}
              onChange={setPos2}
              label="Targeting Offset"
              showAxisLabels
              showReadout={false}
            />
          </div>
        </div>
      </div>

      {/* ── SpeechBubble ─────────────────────────────────── */}
      <div style={section()}>
        <PanelHeader>SpeechBubble</PanelHeader>
        <div style={grid(2)}>
          {/* Interactive demo */}
          <div style={panelStyle}>
            <PanelCorners />
            <span style={label({ marginBottom: spacing.lg })}>Interactive</span>
            <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 60, paddingBottom: spacing.xl }}>
              <SpeechBubble visible={bubbleVisible} style={{ top: -60 }}>
                {bubbleText}
              </SpeechBubble>
              {/* Avatar placeholder */}
              <div style={{
                width: 48,
                height: 48,
                border: `1px solid ${colors.borderHi}`,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.dim,
                fontSize: fontSizes.base,
              }}>
                <PanelCorners />
                ◉
              </div>
              <div style={{ marginTop: spacing.xl, width: "100%", display: "flex", flexDirection: "column", gap: spacing.sm }}>
                <HudTextField
                  label="Bubble text"
                  value={bubbleText}
                  onChange={setBubbleText}
                  placeholder="Enter message…"
                />
                <HudToggle value={bubbleVisible} onChange={setBubbleVisible} label="VISIBLE" offLabel="HIDDEN" />
              </div>
            </div>
          </div>

          {/* Static variants */}
          <div style={panelStyle}>
            <PanelCorners />
            <span style={label({ marginBottom: spacing.lg })}>Always visible variants</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 72, paddingTop: 60, paddingBottom: spacing.md }}>
              {[
                "Short message.",
                "Initialising targeting…\nStand by.",
                "ALERT: perimeter\nbreached at sector 7.",
              ].map((msg, i) => (
                <div key={i} style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                  <SpeechBubble visible style={{ top: -52 }}>
                    {msg}
                  </SpeechBubble>
                  <div style={{ width: 32, height: 32, border: `1px solid ${colors.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: colors.dim, fontSize: fontSizes.sm }}>◉</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── HudTextField — multiline ───────────────────── */}
      <div style={section()}>
        <PanelHeader>HudTextField — Multiline</PanelHeader>
        <div style={grid(2)}>
          <div style={panelStyle}>
            <PanelCorners />
            <span style={label({ marginBottom: spacing.lg })}>Textarea with submit</span>
            <HudTextField
              label="Mission Log"
              value={mlText}
              onChange={setMlText}
              placeholder="Enter mission details…"
              multiline
              rows={5}
              submitLabel="COMMIT"
              onSubmit={() => { setMlSubmitted(mlText); setMlText(""); }}
            />
            {mlSubmitted && (
              <div style={{ marginTop: spacing.md, color: colors.mid, fontSize: fontSizes.xs, borderLeft: `2px solid ${colors.border}`, paddingLeft: spacing.sm, whiteSpace: "pre-wrap" }}>
                {mlSubmitted}
              </div>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: spacing.lg }}>
            <div style={panelStyle}>
              <PanelCorners />
              <span style={label({ marginBottom: spacing.lg })}>Minimal textarea</span>
              <HudTextField
                label="Notes"
                value="Pre-filled multiline content\nLine two of the note."
                onChange={() => {}}
                multiline
                rows={3}
              />
            </div>
            <div style={panelStyle}>
              <PanelCorners />
              <span style={label({ marginBottom: spacing.lg })}>Disabled multiline</span>
              <HudTextField
                label="Encrypted"
                value="[REDACTED CONTENT]\n[ACCESS DENIED]"
                onChange={() => {}}
                multiline
                rows={3}
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── HudSelect ────────────────────────────────────── */}
      <div style={section()}>
        <PanelHeader>HudSelect</PanelHeader>
        <div style={grid(3)}>
          <div style={panelStyle}>
            <PanelCorners />
            <span style={label({ marginBottom: spacing.lg })}>Empty / placeholder</span>
            <HudSelect
              label="Target Zone"
              value={selectVal}
              onChange={setSelectVal}
              placeholder="Select zone…"
              options={[
                { value: "alpha", label: "Alpha — North Perimeter" },
                { value: "bravo", label: "Bravo — East Flank" },
                { value: "charlie", label: "Charlie — South Gate" },
                { value: "delta", label: "Delta — Command Post" },
                { value: "echo", label: "Echo — Reserve" },
              ]}
            />
            {selectVal && (
              <div style={{ marginTop: spacing.md, color: colors.mid, fontSize: fontSizes.xs }}>
                Selected: <span style={{ color: colors.hi }}>{selectVal}</span>
              </div>
            )}
          </div>
          <div style={panelStyle}>
            <PanelCorners />
            <span style={label({ marginBottom: spacing.lg })}>Pre-selected value</span>
            <HudSelect
              label="Protocol"
              value={selectVal2}
              onChange={setSelectVal2}
              options={[
                { value: "alpha", label: "ALPHA — Stealth" },
                { value: "bravo", label: "BRAVO — Standard" },
                { value: "charlie", label: "CHARLIE — Assault" },
                { value: "lockdown", label: "LOCKDOWN", disabled: true },
              ]}
            />
          </div>
          <div style={panelStyle}>
            <PanelCorners />
            <span style={label({ marginBottom: spacing.lg })}>Disabled state</span>
            <HudSelect
              label="Encryption"
              value="aes256"
              onChange={() => {}}
              disabled
              options={[
                { value: "aes256", label: "AES-256" },
                { value: "rsa", label: "RSA-4096" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* ── HudCheckbox ──────────────────────────────────── */}
      <div style={section()}>
        <PanelHeader>HudCheckbox &amp; HudCheckboxGroup</PanelHeader>
        <div style={grid(3)}>
          {/* Single checkboxes */}
          <div style={panelStyle}>
            <PanelCorners />
            <span style={label({ marginBottom: spacing.lg })}>Single checkboxes</span>
            <div style={{ display: "flex", flexDirection: "column", gap: spacing.md }}>
              <HudCheckbox checked={chk1} onChange={setChk1} label="Confirm Launch" />
              <HudCheckbox checked={chk2} onChange={setChk2} label="Enable Shields" />
              <HudCheckbox checked={false} onChange={() => {}} label="Indeterminate" indeterminate />
              <HudCheckbox checked={false} onChange={() => {}} label="Disabled off" disabled />
              <HudCheckbox checked={true} onChange={() => {}} label="Disabled on" disabled />
            </div>
          </div>

          {/* Vertical group */}
          <div style={panelStyle}>
            <PanelCorners />
            <span style={label({ marginBottom: spacing.lg })}>Group — vertical</span>
            <HudCheckboxGroup
              label="Active Systems"
              value={chkGroup}
              onChange={setChkGroup}
              options={[
                { value: "radar",  label: "Radar" },
                { value: "shield", label: "Shields" },
                { value: "drive",  label: "Drive" },
                { value: "weapons", label: "Weapons", disabled: true },
              ]}
            />
            <div style={{ marginTop: spacing.md, color: colors.dim, fontSize: fontSizes.xs }}>
              Active: <span style={{ color: colors.hi }}>{chkGroup.join(", ") || "none"}</span>
            </div>
          </div>

          {/* Horizontal group */}
          <div style={panelStyle}>
            <PanelCorners />
            <span style={label({ marginBottom: spacing.lg })}>Group — horizontal</span>
            <HudCheckboxGroup
              label="Comms Channels"
              value={chkGroup}
              onChange={setChkGroup}
              direction="horizontal"
              options={[
                { value: "radar",  label: "Radar" },
                { value: "shield", label: "Shield" },
                { value: "drive",  label: "Drive" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* ── HudNavBar ────────────────────────────────────── */}
      <div style={section()}>
        <PanelHeader>HudNavBar</PanelHeader>
        <div style={{ display: "flex", gap: spacing.xl, alignItems: "flex-start" }}>
          {/* Full nav with nested items */}
          <HudNavBar
            title="Navigation"
            activeId={navActive}
            onSelect={setNavActive}
            items={[
              { id: "dashboard", label: "Dashboard",  icon: "◈" },
              { id: "map",       label: "Tactical Map", icon: "◉" },
              {
                id: "systems",
                label: "Systems",
                icon: "◧",
                children: [
                  { id: "radar",    label: "Radar Array" },
                  { id: "shields",  label: "Shield Grid" },
                  { id: "weapons",  label: "Weapons" },
                  { id: "drive",    label: "Drive Core", disabled: true },
                ],
              },
              {
                id: "comms",
                label: "Comms",
                icon: "◎",
                children: [
                  { id: "broadcast", label: "Broadcast" },
                  { id: "encrypted", label: "Encrypted" },
                ],
              },
              { id: "logs",     label: "Mission Logs", icon: "◫" },
              { id: "settings", label: "Settings",     icon: "◌", disabled: true },
            ]}
          />

          {/* Minimal no-title nav */}
          <HudNavBar
            activeId={navActive}
            onSelect={setNavActive}
            width={180}
            items={[
              { id: "dashboard", label: "Dashboard" },
              { id: "map",       label: "Tactical Map" },
              { id: "logs",      label: "Mission Logs" },
              { id: "settings",  label: "Settings", disabled: true },
            ]}
          />

          {/* Selected item readout */}
          <div style={{ flex: 1, ...panelStyle }}>
            <PanelCorners />
            <PanelHeader>Active Route</PanelHeader>
            <div style={{ color: colors.dim, fontSize: fontSizes.xs }}>
              Current page ID:
            </div>
            <div style={{ marginTop: spacing.sm, color: colors.hi, fontSize: fontSizes.xl, textTransform: "uppercase", letterSpacing: "0.15em" }}>
              {navActive}
            </div>
            <div style={{ marginTop: spacing.xl, color: colors.dim, fontSize: fontSizes.xs, lineHeight: 1.7 }}>
              Click any nav item above to change the active route.
              Groups expand / collapse on click.
            </div>
          </div>
        </div>
      </div>

      {/* ── HudGrid ──────────────────────────────────────── */}
      <div style={section()}>
        <PanelHeader>HudGrid &amp; HudGridItem</PanelHeader>

        {/* Example 1: fixed 3-col with spanning */}
        <span style={label({ marginBottom: spacing.lg })}>Fixed 3-col · span · rowSpan</span>
        <HudGrid cols={3} gap={spacing.md} style={{ marginBottom: spacing.xl }}>
          <HudGridItem span={2}>
            <div style={{ ...panelStyle, position: "relative" }}>
              <PanelCorners />
              <div style={{ color: colors.mid, fontSize: fontSizes.xs, marginBottom: spacing.xs }}>span=2</div>
              <div style={{ color: colors.text, fontSize: fontSizes.xs }}>Wide cell spanning two columns</div>
            </div>
          </HudGridItem>
          <HudGridItem>
            <div style={{ ...panelStyle, position: "relative" }}>
              <PanelCorners />
              <div style={{ color: colors.mid, fontSize: fontSizes.xs, marginBottom: spacing.xs }}>span=1</div>
              <div style={{ color: colors.text, fontSize: fontSizes.xs }}>Single col</div>
            </div>
          </HudGridItem>
          <HudGridItem>
            <div style={{ ...panelStyle, position: "relative" }}>
              <PanelCorners />
              <div style={{ color: colors.mid, fontSize: fontSizes.xs }}>auto</div>
            </div>
          </HudGridItem>
          <HudGridItem span={2}>
            <div style={{ ...panelStyle, position: "relative" }}>
              <PanelCorners />
              <div style={{ color: colors.mid, fontSize: fontSizes.xs, marginBottom: spacing.xs }}>span=2 · colStart default</div>
              <div style={{ color: colors.text, fontSize: fontSizes.xs }}>Flows naturally in grid</div>
            </div>
          </HudGridItem>
        </HudGrid>

        {/* Example 2: responsive cols */}
        <span style={label({ marginBottom: spacing.lg })}>Responsive cols · mobile=1 tablet=2 desktop=4</span>
        <HudGrid cols={{ mobile: 1, tablet: 2, desktop: 4 }} gap={spacing.md} style={{ marginBottom: spacing.xl }}>
          {["Alpha", "Bravo", "Charlie", "Delta"].map((name) => (
            <HudGridItem key={name}>
              <div style={{ ...panelStyle, position: "relative", textAlign: "center" }}>
                <PanelCorners />
                <div style={{ color: colors.hi, fontSize: fontSizes.xs, textTransform: "uppercase", letterSpacing: "0.1em" }}>{name}</div>
              </div>
            </HudGridItem>
          ))}
        </HudGrid>

        {/* Example 3: colStart pinning */}
        <span style={label({ marginBottom: spacing.lg })}>12-col · explicit colStart placement</span>
        <HudGrid cols={12} gap={spacing.sm}>
          <HudGridItem span={3}>
            <div style={{ ...panelStyle, position: "relative" }}><PanelCorners /><div style={{ color: colors.dim, fontSize: fontSizes.xs }}>3 / 12</div></div>
          </HudGridItem>
          <HudGridItem span={6} colStart={4}>
            <div style={{ ...panelStyle, position: "relative" }}><PanelCorners /><div style={{ color: colors.mid, fontSize: fontSizes.xs }}>6 / 12 · colStart=4</div></div>
          </HudGridItem>
          <HudGridItem span={2} colStart={11}>
            <div style={{ ...panelStyle, position: "relative" }}><PanelCorners /><div style={{ color: colors.dim, fontSize: fontSizes.xs }}>2 / 12</div></div>
          </HudGridItem>
        </HudGrid>
      </div>

      {/* ── HudFolder ────────────────────────────────────── */}
      <div style={section()}>
        <PanelHeader>HudFolder</PanelHeader>
        <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.xl, marginBottom: spacing.xl }}>
          {[
            { id: "sector16", title: "SECTOR_16",  subtitle: "Special Project",    icon: "◧", count: 5 },
            { id: "archive",  title: "ARCHIVE",    subtitle: "2025 — Sealed",       icon: "◨", count: 3 },
            { id: "ops",      title: "OPS CENTER", subtitle: "Active Operations",   icon: "◩", count: 6 },
            { id: "comms",    title: "COMMS",      subtitle: "Encrypted Channels",  icon: "◪", count: 2 },
          ].map(({ id, title, subtitle, icon, count }) => (
            <HudFolder
              key={id}
              title={title}
              subtitle={subtitle}
              icon={icon}
              count={count}
              selected={folderActive === id}
              onClick={() => setFolderActive(id)}
              style={{ width: 200 }}
            />
          ))}
        </div>

        {/* cut corner variants */}
        <span style={label({ marginBottom: spacing.lg })}>Cut corner variants</span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.xl }}>
          <HudFolder title="TOP-LEFT"  subtitle="cutCorner=top-left"  cutCorner="top-left"  count={3} style={{ width: 200 }} />
          <HudFolder title="TOP-RIGHT" subtitle="cutCorner=top-right" cutCorner="top-right" count={3} style={{ width: 200 }} />
          <HudFolder title="LARGE CUT" subtitle="cutSize=48"          cutSize={48}          count={7} style={{ width: 200 }} />
          <HudFolder title="DISABLED"  subtitle="disabled=true"       disabled              count={3} style={{ width: 200 }} />
        </div>

        {/* readout */}
        <div style={{ marginTop: spacing.xl, ...panelStyle, maxWidth: 320, position: "relative" }}>
          <PanelCorners />
          <div style={{ color: colors.dim, fontSize: fontSizes.xs }}>Active folder:</div>
          <div style={{ color: colors.hi, fontSize: fontSizes.lg, textTransform: "uppercase", letterSpacing: "0.15em", marginTop: spacing.xs }}>{folderActive}</div>
        </div>
      </div>

      {/* ── HudDocument ──────────────────────────────────── */}
      <div style={section()}>
        <PanelHeader>HudDocument</PanelHeader>
        <HudGrid cols={{ mobile: 3, tablet: 5, desktop: 8 }} gap={spacing.sm} style={{ marginBottom: spacing.xl }}>
          {[
            { id: "brief",      title: "MISSION BRIEF",    meta: "2026-02-25 · CLASSIFIED",    badge: "PDF", icon: "◫" },
            { id: "recon",      title: "RECON REPORT",     meta: "SECTOR_16 · Agent Kilo",      badge: "RPT", icon: "◫" },
            { id: "manifest",   title: "SUPPLY MANIFEST",  meta: "Requisition #0047 · Pending", badge: "REQ", icon: "◧" },
            { id: "syslog",     title: "SYSTEM LOG",       meta: "Auto-generated · 00:00 UTC",  badge: "LOG", icon: "◨" },
            { id: "intel",      title: "INTEL SUMMARY",    meta: "Eyes Only · Level 5",         badge: "TS",  icon: "◫" },
            { id: "sitrep",     title: "SITREP #44",       meta: "0600 UTC · Ops Command",      badge: "SIT", icon: "◫" },
            { id: "comms",      title: "COMMS LOG",        meta: "Freq 412.8 · Encrypted",      badge: "TXT", icon: "◨" },
            { id: "ordinance",  title: "ORD CHECKLIST",    meta: "Pre-mission · Sign off",      badge: "CHK", icon: "◧" },
            { id: "delta",      title: "DELTA BRIEF",      meta: "Unit 7 · Strike Team",        badge: "OPS", icon: "◫" },
            { id: "thermal",    title: "THERMAL SCAN",     meta: "Grid 44N-112E · 0430",        badge: "IMG", icon: "◫" },
            { id: "medkit",     title: "MED INVENTORY",    meta: "Field Station 3 · Current",   badge: "MED", icon: "◧" },
            { id: "nav",        title: "NAV WAYPOINTS",    meta: "Route Alpha · 12 pts",        badge: "NAV", icon: "◨" },
            { id: "extraction", title: "EXTRACTION PLAN",  meta: "LZ Bravo · ETA 14:30",        badge: "PDF", icon: "◫" },
            { id: "sigint",     title: "SIGINT REPORT",    meta: "Source 7 · Intercept",        badge: "SIG", icon: "◫" },
            { id: "roster",     title: "UNIT ROSTER",      meta: "Alpha Company · 48 pers",     badge: "XLS", icon: "◧" },
          ].map(({ id, title, meta, badge, icon }) => (
            <HudGridItem key={id}>
              <HudDocument
                title={title}
                meta={meta}
                badge={badge}
                icon={icon}
                selected={docActive === id}
                onClick={() => setDocActive(id)}
              />
            </HudGridItem>
          ))}
          <HudGridItem>
            <HudDocument
              title="ENCRYPTED FILE"
              meta="Access Denied"
              badge="ENC"
              foldCorner="top-left"
              disabled
            />
          </HudGridItem>
        </HudGrid>

        {/* Fold corner variants */}
        <span style={label({ marginBottom: spacing.lg })}>Fold corner · foldCorner=top-left</span>
        <div style={{ display: "flex", gap: spacing.lg, flexWrap: "wrap" }}>
          <HudDocument title="TOP-RIGHT" meta="foldCorner=top-right" foldCorner="top-right" style={{ width: 200 }} />
          <HudDocument title="TOP-LEFT"  meta="foldCorner=top-left"  foldCorner="top-left"  style={{ width: 200 }} />
        </div>

        <div style={{ marginTop: spacing.xl, ...panelStyle, maxWidth: 320, position: "relative" }}>
          <PanelCorners />
          <div style={{ color: colors.dim, fontSize: fontSizes.xs }}>Active document:</div>
          <div style={{ color: colors.hi, fontSize: fontSizes.lg, textTransform: "uppercase", letterSpacing: "0.15em", marginTop: spacing.xs }}>{docActive}</div>
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: spacing.xl, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ color: colors.dim, fontSize: fontSizes.xs, letterSpacing: "0.08em" }}>◆ RFUI — military-grade steel-blue design language</span>
        <span style={{ color: colors.dim, fontSize: fontSizes.xs, letterSpacing: "0.08em" }}>@rfahmi/rfui</span>
      </div>
    </HudPage>
  );
}
