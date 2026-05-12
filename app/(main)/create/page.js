"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlatformIcon, PLATFORMS } from "@/components/PlatformIcons";
import { TEMPLATES, getCustomBgStyle } from "@/components/ProfileTemplates";
import toast from "react-hot-toast";

export default function CreatePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [hasTree, setHasTree] = useState(false);

  const [form, setForm] = useState({
    title: "My Links",
    username: "",
    profilePicture: "",
    template: "classic",
    customBg: {
      bgType: "color",
      color1: "#1f232f",
      color2: "#304e21",
      imageUrl: "",
      textColor: "light",
    },
    socialLinks: [{ platform: "Website", label: "", url: "" }],
  });

  // Fetch user + existing tree on mount
  useEffect(() => {
    const init = async () => {
      try {
        // Get user info
        const meRes = await fetch("/api/auth/me");
        const meData = await meRes.json();
        if (!meData.loggedIn) {
          router.push("/login");
          return;
        }
        setUser(meData.user);

        // Get existing tree
        const treeRes = await fetch("/api/tree");
        const treeData = await treeRes.json();
        if (treeData.tree) {
          setForm({
            title: treeData.tree.title || "My Links",
            username: treeData.tree.username || "",
            profilePicture: treeData.tree.profilePicture || "",
            template: treeData.tree.template || "classic",
            customBg: treeData.tree.customBg || {
              bgType: "color",
              color1: "#1f232f",
              color2: "#304e21",
              imageUrl: "",
              textColor: "light",
            },
            socialLinks:
              treeData.tree.socialLinks?.length > 0
                ? treeData.tree.socialLinks.map(l => ({ platform: l.platform, label: l.label || "", url: l.url }))
                : [{ platform: "Website", label: "", url: "" }],
          });
          setHasTree(true);
        } else {
          // Default username to their account username
          setForm((prev) => ({ ...prev, username: meData.user.username }));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [router]);

  // Add a new link row
  const addLink = () => {
    setForm((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, { platform: "Website", label: "", url: "" }],
    }));
  };

  // Remove a link row
  const removeLink = (index) => {
    setForm((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  // Update a link field
  const updateLink = (index, field, value) => {
    setForm((prev) => {
      const updated = [...prev.socialLinks];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, socialLinks: updated };
    });
  };

  // Save / Create
  const handleSave = async () => {
    setSaving(true);

    if (!form.username.trim()) {
      toast.error("Username handle is required");
      setSaving(false);
      return;
    }

    // Filter out empty links
    const cleanLinks = form.socialLinks.filter((l) => l.url.trim() !== "");

    try {
      const method = hasTree ? "PUT" : "POST";
      const res = await fetch("/api/tree", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          socialLinks: cleanLinks,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        setSaving(false);
        return;
      }

      setHasTree(true);
      toast.success(data.message);
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Delete tree
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your link tree?")) return;
    setDeleting(true);

    try {
      const res = await fetch("/api/tree", { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        setDeleting(false);
        return;
      }

      setHasTree(false);
      setForm({
        title: "My Links",
        username: user?.username || "",
        profilePicture: "",
        template: "classic",
        customBg: {
          bgType: "color",
          color1: "#1f232f",
          color2: "#304e21",
          imageUrl: "",
          textColor: "light",
        },
        socialLinks: [{ platform: "Website", label: "", url: "" }],
      });
      toast.success("Link tree deleted");
    } catch (err) {
      toast.error("Network error");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="flex items-center gap-3 text-navy">
          <svg
            className="w-6 h-6 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <span className="text-lg font-semibold">Loading your links…</span>
        </div>
      </main>
    );
  }

  const previewLinks = form.socialLinks.filter((l) => l.url.trim() !== "");

  return (
    <main className="flex-1">
      {/* ─── Premium Header ─── */}
      <div className="bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-lime/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-forest/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14 relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center text-lg">
              {hasTree ? "✏️" : "✨"}
            </span>
            <span className="px-3 py-1 rounded-full bg-lime/10 text-lime text-[10px] font-bold uppercase tracking-widest">
              {hasTree ? "Editor" : "New Page"}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-lime tracking-tight">
            {hasTree ? "Edit your links" : "Create your Linkify"}
          </h1>
          <p className="mt-2 text-lime-light/50 text-sm sm:text-base">
            {hasTree
              ? "Update your links, template, or username handle."
              : "Set up your personalized link page in seconds."}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* ─── Editor (left) ─── */}
          <div className="lg:col-span-3 space-y-6">
            {/* Title & Username Card */}
            <div className="bg-white/60 backdrop-blur-xl border border-forest/10 rounded-2xl p-6 sm:p-8 shadow-lg shadow-navy/5">
              <h2 className="text-lg font-bold text-navy mb-5 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center text-sm">
                  ✏️
                </span>
                Profile
              </h2>

              {/* Title */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-navy mb-1.5"
                >
                  Page Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="My Links"
                  className="w-full px-4 py-3 rounded-xl bg-lime-light/30 border border-forest/15 text-navy placeholder:text-forest-light/50 text-sm font-medium outline-none transition-all duration-200 focus:border-navy focus:ring-2 focus:ring-navy/10"
                />
              </div>

              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-navy mb-1.5"
                >
                  Username Handle
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-forest-light/50 text-xs sm:text-sm font-medium">
                    linkify/
                  </span>
                  <input
                    id="username"
                    type="text"
                    value={form.username}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        username: e.target.value.toLowerCase().replace(/\s/g, ""),
                      }))
                    }
                    placeholder="yourname"
                    className="w-full pl-20 sm:pl-24 pr-4 py-3 rounded-xl bg-lime-light/30 border border-forest/15 text-navy placeholder:text-forest-light/50 text-sm font-medium outline-none transition-all duration-200 focus:border-navy focus:ring-2 focus:ring-navy/10"
                  />
                </div>
                <p className="text-[10px] text-forest-light mt-1.5 ml-1 font-semibold">
                    Note: Username can only be changed once every 7 days.
                  </p>
              </div>

              {/* Profile Picture */}
              <div className="mt-4">
                <label
                  htmlFor="profilePicture"
                  className="block text-sm font-semibold text-navy mb-1.5"
                >
                  Profile Picture URL (Optional)
                </label>
                <input
                  id="profilePicture"
                  type="url"
                  value={form.profilePicture}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, profilePicture: e.target.value }))
                  }
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-4 py-3 rounded-xl bg-lime-light/30 border border-forest/15 text-navy placeholder:text-forest-light/50 text-sm font-medium outline-none transition-all duration-200 focus:border-navy focus:ring-2 focus:ring-navy/10"
                />
              </div>
            </div>

            {/* Template Selector Card */}
            <div className="bg-white/60 backdrop-blur-xl border border-forest/10 rounded-2xl p-6 sm:p-8 shadow-lg shadow-navy/5">
              <h2 className="text-lg font-bold text-navy mb-5 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center text-sm">
                  🎨
                </span>
                Template
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() =>
                      setForm((prev) => ({ ...prev, template: tmpl.id }))
                    }
                    className={`relative rounded-xl p-3 border-2 transition-all duration-200 text-left ${
                      form.template === tmpl.id
                        ? "border-navy shadow-lg shadow-navy/10 scale-[1.02]"
                        : "border-forest/10 hover:border-forest/30"
                    }`}
                  >
                    {/* Mini preview */}
                    <div className={`w-full aspect-[3/4] rounded-lg ${tmpl.preview.bg} flex flex-col items-center justify-center gap-1.5 p-2 mb-2`}>
                      <div className={`w-6 h-6 rounded-full ${tmpl.preview.accent}`} />
                      <div className={`w-10 h-1 rounded-full ${tmpl.preview.accent} opacity-60`} />
                      <div className={`w-full h-2 rounded ${tmpl.preview.accent} opacity-30 mt-1`} />
                      <div className={`w-full h-2 rounded ${tmpl.preview.accent} opacity-20`} />
                      <div className={`w-full h-2 rounded ${tmpl.preview.accent} opacity-10`} />
                    </div>
                    <p className="text-xs font-bold text-navy">{tmpl.name}</p>
                    <p className="text-[10px] text-forest-light">{tmpl.desc}</p>
                    {form.template === tmpl.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-navy flex items-center justify-center">
                        <svg className="w-3 h-3 text-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Background Editor — only shown when custom is selected */}
            {form.template === "custom" && (
              <div className="bg-white/60 backdrop-blur-xl border border-forest/10 rounded-2xl p-6 sm:p-8 shadow-lg shadow-navy/5">
                <h2 className="text-lg font-bold text-navy mb-5 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center text-sm">🖌️</span>
                  Custom Background
                </h2>

                {/* Background type tabs */}
                <div className="flex rounded-xl bg-lime-light/30 p-1 mb-5">
                  {[
                    { id: "color", label: "Solid Color" },
                    { id: "gradient", label: "Gradient" },
                    { id: "image", label: "Image URL" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() =>
                        setForm((prev) => ({
                          ...prev,
                          customBg: { ...prev.customBg, bgType: tab.id },
                        }))
                      }
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                        form.customBg.bgType === tab.id
                          ? "bg-navy text-lime shadow-md"
                          : "text-forest hover:text-navy"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Color pickers / Image URL */}
                {form.customBg.bgType === "color" && (
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Background Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={form.customBg.color1}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            customBg: { ...prev.customBg, color1: e.target.value },
                          }))
                        }
                        className="w-12 h-12 rounded-xl border-2 border-forest/15 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={form.customBg.color1}
                        onChange={(e) =>
                          setForm((prev) => ({
                            ...prev,
                            customBg: { ...prev.customBg, color1: e.target.value },
                          }))
                        }
                        className="flex-1 px-4 py-3 rounded-xl bg-lime-light/30 border border-forest/15 text-navy text-sm font-mono font-medium outline-none focus:border-navy focus:ring-2 focus:ring-navy/10"
                      />
                    </div>
                  </div>
                )}

                {form.customBg.bgType === "gradient" && (
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-navy">Gradient Colors</label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-forest-light uppercase mb-1">From</p>
                        <div className="flex items-center gap-2">
                          <input type="color" value={form.customBg.color1}
                            onChange={(e) => setForm((prev) => ({ ...prev, customBg: { ...prev.customBg, color1: e.target.value } }))}
                            className="w-10 h-10 rounded-lg border-2 border-forest/15 cursor-pointer" />
                          <input type="text" value={form.customBg.color1}
                            onChange={(e) => setForm((prev) => ({ ...prev, customBg: { ...prev.customBg, color1: e.target.value } }))}
                            className="flex-1 px-3 py-2 rounded-lg bg-lime-light/30 border border-forest/15 text-navy text-xs font-mono outline-none focus:border-navy" />
                        </div>
                      </div>
                      <div className="pt-5 text-forest-light">→</div>
                      <div className="flex-1">
                        <p className="text-[10px] font-bold text-forest-light uppercase mb-1">To</p>
                        <div className="flex items-center gap-2">
                          <input type="color" value={form.customBg.color2}
                            onChange={(e) => setForm((prev) => ({ ...prev, customBg: { ...prev.customBg, color2: e.target.value } }))}
                            className="w-10 h-10 rounded-lg border-2 border-forest/15 cursor-pointer" />
                          <input type="text" value={form.customBg.color2}
                            onChange={(e) => setForm((prev) => ({ ...prev, customBg: { ...prev.customBg, color2: e.target.value } }))}
                            className="flex-1 px-3 py-2 rounded-lg bg-lime-light/30 border border-forest/15 text-navy text-xs font-mono outline-none focus:border-navy" />
                        </div>
                      </div>
                    </div>
                    {/* Gradient preview */}
                    <div className="h-8 rounded-lg" style={{ background: `linear-gradient(135deg, ${form.customBg.color1}, ${form.customBg.color2})` }} />
                  </div>
                )}

                {form.customBg.bgType === "image" && (
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-2">Image URL</label>
                    <input
                      type="url"
                      value={form.customBg.imageUrl}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          customBg: { ...prev.customBg, imageUrl: e.target.value },
                        }))
                      }
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-4 py-3 rounded-xl bg-lime-light/30 border border-forest/15 text-navy placeholder:text-forest-light/50 text-sm font-medium outline-none focus:border-navy focus:ring-2 focus:ring-navy/10"
                    />
                    {form.customBg.imageUrl && (
                      <div className="mt-3 h-24 rounded-lg overflow-hidden border border-forest/10">
                        <img src={form.customBg.imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                      </div>
                    )}
                  </div>
                )}

                {/* Text color toggle */}
                <div className="mt-5 pt-4 border-t border-forest/10">
                  <label className="block text-sm font-semibold text-navy mb-2">Text Color</label>
                  <div className="flex rounded-xl bg-lime-light/30 p-1">
                    <button
                      onClick={() => setForm((prev) => ({ ...prev, customBg: { ...prev.customBg, textColor: "light" } }))}
                      className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        form.customBg.textColor === "light"
                          ? "bg-zinc-900 text-white shadow-md"
                          : "text-forest hover:text-navy"
                      }`}>
                      <span className="w-4 h-4 rounded-full bg-white border border-gray-300" />
                      Light Text
                    </button>
                    <button
                      onClick={() => setForm((prev) => ({ ...prev, customBg: { ...prev.customBg, textColor: "dark" } }))}
                      className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        form.customBg.textColor === "dark"
                          ? "bg-white text-zinc-900 shadow-md border border-forest/10"
                          : "text-forest hover:text-navy"
                      }`}>
                      <span className="w-4 h-4 rounded-full bg-zinc-900" />
                      Dark Text
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Social Links Card */}
            <div className="bg-white/60 backdrop-blur-xl border border-forest/10 rounded-2xl p-6 sm:p-8 shadow-lg shadow-navy/5">
              <h2 className="text-lg font-bold text-navy mb-5 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center text-sm">
                  🔗
                </span>
                Links
              </h2>

              <div className="space-y-4">
                {form.socialLinks.map((link, index) => (
                  <div
                    key={index}
                    className="bg-lime-light/10 border border-forest/10 p-3 sm:p-4 rounded-xl group relative"
                  >
                    {/* Header: Platform Select and Remove button */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <PlatformIcon platform={link.platform} className="w-5 h-5 shrink-0 text-navy" />
                        <select
                          value={link.platform}
                          onChange={(e) =>
                            updateLink(index, "platform", e.target.value)
                          }
                          className="px-2 py-1.5 rounded-lg bg-white/50 border border-forest/15 text-navy text-sm font-medium outline-none transition-all duration-200 focus:border-navy focus:ring-2 focus:ring-navy/10 appearance-none cursor-pointer"
                        >
                          {PLATFORMS.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      </div>

                      <button
                        onClick={() => removeLink(index)}
                        disabled={form.socialLinks.length === 1}
                        className="p-1.5 rounded-lg text-forest-light hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-forest-light disabled:hover:bg-transparent"
                        title="Remove link"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    {/* Inputs: Label and URL */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => updateLink(index, "label", e.target.value)}
                        placeholder="Custom Name (Optional)"
                        className="flex-1 w-full px-3 py-2.5 rounded-lg bg-lime-light/30 border border-forest/15 text-navy placeholder:text-forest-light/50 text-sm font-medium outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10"
                      />
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => updateLink(index, "url", e.target.value)}
                        placeholder="https://..."
                        className="flex-[2] w-full px-3 py-2.5 rounded-lg bg-lime-light/30 border border-forest/15 text-navy placeholder:text-forest-light/50 text-sm font-medium outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Add link button */}
              <button
                onClick={addLink}
                className="mt-4 w-full py-3 rounded-xl border-2 border-dashed border-forest/20 text-sm font-semibold text-forest hover:border-navy hover:text-navy hover:bg-navy/5 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add another link
              </button>
            </div>

            {/* Action Buttons */}
            <div className="bg-white/60 backdrop-blur-xl border border-forest/10 rounded-2xl p-4 sm:p-5 shadow-lg shadow-navy/5">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="group flex-1 py-3.5 rounded-xl bg-navy text-lime font-bold text-sm transition-all duration-300 hover:bg-forest hover:shadow-xl hover:shadow-navy/20 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Saving…
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {hasTree ? "Save Changes" : "Create Linkify"}
                    </>
                  )}
                </button>

                {hasTree && (
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="group px-6 py-3.5 rounded-xl border-2 border-red-200 text-red-500 font-semibold text-sm transition-all duration-300 hover:bg-red-50 hover:border-red-400 hover:text-red-600 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {deleting ? "Deleting…" : "Delete"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ─── Live Preview (right) ─── */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-forest-light uppercase tracking-widest">
                  Live Preview
                </p>
                <span className="flex items-center gap-1.5 text-[10px] font-semibold text-forest-light/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Real-time
                </span>
              </div>

              {/* Phone frame */}
              <div className="mx-auto max-w-xs">
                <div className="bg-zinc-900 rounded-[2.5rem] p-3 shadow-2xl shadow-navy/40 ring-1 ring-white/5">
                  {/* Notch */}
                  <div className="flex justify-center mb-[-8px] relative z-20">
                    <div className="w-24 h-5 bg-zinc-900 rounded-b-2xl" />
                  </div>
                  <div
                    className={`rounded-[1.4rem] min-h-[480px] p-6 flex flex-col items-center overflow-hidden relative ${
                      form.template === "classic" ? "bg-navy" :
                      form.template === "minimal" ? "bg-stone-50" :
                      form.template === "gradient" ? "bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400" :
                      form.template === "neon" ? "bg-zinc-950" : ""
                    }`}
                    style={form.template === "custom" && form.customBg.bgType !== "image" ? getCustomBgStyle(form.customBg) : {}}
                  >
                    {/* Image background using <img> for better rendering */}
                    {form.template === "custom" && form.customBg.bgType === "image" && form.customBg.imageUrl && (
                      <img
                        src={form.customBg.imageUrl}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    )}

                    {/* Dark overlay for image bg */}
                    {form.template === "custom" && form.customBg.bgType === "image" && (
                      <div className="absolute inset-0 bg-black/40 rounded-[1.4rem]" />
                    )}

                    <div className="relative z-10 flex flex-col items-center w-full flex-1">
                    {/* Avatar */}
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center text-xl font-extrabold mt-4 mb-2 overflow-hidden ${
                      form.template === "classic" ? "bg-lime text-navy" :
                      form.template === "minimal" ? "bg-stone-900 text-white" :
                      form.template === "gradient" ? "bg-white/20 text-white border-2 border-white/30" :
                      form.template === "neon" ? "bg-zinc-900 text-cyan-400 border-2 border-cyan-400/50" :
                      form.customBg.textColor === "dark" ? "bg-gray-900 text-white" : "bg-white/20 text-white border-2 border-white/30"
                    }`}>
                      {form.profilePicture ? (
                        <img src={form.profilePicture} alt="Profile" className="w-full h-full object-cover" style={{ imageRendering: 'auto' }} referrerPolicy="no-referrer" onError={(e) => { e.target.style.display = 'none'; }} />
                      ) : (
                        form.username?.charAt(0)?.toUpperCase() || "?"
                      )}
                    </div>

                    {/* Title */}
                    <h3 className={`text-sm font-extrabold text-center truncate w-full ${
                      form.template === "classic" ? "text-lime" :
                      form.template === "minimal" ? "text-stone-900" :
                      form.template === "gradient" ? "text-white" :
                      form.template === "neon" ? "text-white" :
                      form.customBg.textColor === "dark" ? "text-gray-900" : "text-white"
                    }`}>
                      {form.title || "My Links"}
                    </h3>

                    {/* Handle */}
                    <p className={`text-[10px] font-semibold mb-4 ${
                      form.template === "classic" ? "text-lime/50" :
                      form.template === "minimal" ? "text-stone-400" :
                      form.template === "gradient" ? "text-white/60" :
                      form.template === "neon" ? "text-cyan-400/50" :
                      form.customBg.textColor === "dark" ? "text-gray-500" : "text-white/50"
                    }`}>
                      @{form.username || "username"}
                    </p>

                    {/* Links */}
                    <div className="w-full space-y-2 flex-1">
                      {previewLinks.length > 0 ? (
                        previewLinks.map((link, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-2 w-full px-3 py-2.5 rounded-lg text-xs font-semibold ${
                              form.template === "classic" ? "bg-lime/10 border border-lime/15 text-lime" :
                              form.template === "minimal" ? "bg-white border border-stone-200 text-stone-800" :
                              form.template === "gradient" ? "bg-white/15 border border-white/20 text-white" :
                              form.template === "neon" ? "bg-zinc-900/80 border border-zinc-800 text-zinc-300" :
                              form.customBg.textColor === "dark" ? "bg-black/5 border border-black/10 text-gray-900" : "bg-white/10 border border-white/15 text-white"
                            }`}
                          >
                            <PlatformIcon platform={link.platform} className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{link.label?.trim() ? link.label : link.platform}</span>
                          </div>
                        ))
                      ) : (
                        <div className={`text-center py-6 text-[10px] ${
                          form.template === "minimal" ? "text-stone-400" :
                          (form.template === "custom" && form.customBg.textColor === "dark") ? "text-gray-400" : "text-white/30"
                        }`}>
                          Add some links
                        </div>
                      )}
                    </div>

                    {/* Branding */}
                    <p className={`mt-4 mb-1 text-[8px] font-bold uppercase tracking-widest ${
                      form.template === "minimal" ? "text-stone-300" :
                      (form.template === "custom" && form.customBg.textColor === "dark") ? "text-gray-300" : "text-white/20"
                    }`}>
                      🔗 Linkify
                    </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share link */}
              {hasTree && form.username && (
                <div className="mt-4 text-center">
                  <p className="text-xs text-forest-light mb-1">Your public link:</p>
                  <a
                    href={`https://link-tree-rho-dun.vercel.app/${form.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:text-forest transition-colors underline underline-offset-2"
                  >
                    <span className="truncate">link-tree-rho-dun.vercel.app/{form.username}</span>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}