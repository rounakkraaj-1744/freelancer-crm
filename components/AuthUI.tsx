"use client";

import { useSupabase } from "@/components/SupabaseProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Mail, Sparkles, LogIn } from "lucide-react";
import Link from "next/link";

export function AuthUI() {
  const { supabase } = useSupabase();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    setLoading(false);
    if (error) alert(error.message);
    else setSent(true);
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  if (sent) {
    return (
      <div className="flex animate-in fade-in zoom-in-95 duration-500">
        <Card className="w-full max-w-sm border-border shadow-2xl bg-white rounded-3xl overflow-hidden text-center p-12 space-y-6">
          <div className="mx-auto w-16 h-16 bg-sage/10 rounded-2xl flex items-center justify-center text-sage">
            <Mail className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-black text-olive uppercase tracking-tight">Check Your Inbox</h2>
            <p className="text-xs font-bold text-olive/50 uppercase tracking-widest leading-relaxed">
              We've sent a magic link to <span className="text-sage">{email}</span>. Click it to enter your workspace.
            </p>
          </div>
          <Button variant="ghost" className="text-xs font-black text-olive/40 hover:text-sage transition-colors uppercase tracking-widest" onClick={() => setSent(false)}>
            Use a different email
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-cream px-4">
      <div className="absolute top-10 left-10">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-sage flex items-center justify-center shadow-lg group-hover:-translate-y-px transition-all">
            <Sparkles className="h-4 w-4 text-cream" />
          </div>
          <span className="text-lg font-black tracking-tight text-sage">Safelance</span>
        </Link>
      </div>

      <Card className="w-full max-w-[380px] border-border shadow-2xl bg-white rounded-[2rem] overflow-hidden p-2">
        <CardHeader className="space-y-1 text-center p-8 pt-10">
          <div className="mx-auto w-12 h-12 bg-olive/5 rounded-2xl flex items-center justify-center mb-4 transition-transform hover:rotate-6">
            <LogIn className="text-olive h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-black tracking-tight text-olive uppercase">Access Pipeline</CardTitle>
          <CardDescription className="text-[10px] font-black uppercase text-olive/40 tracking-widest px-4">
            Initialize your AI-powered freelancer command center.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-8 pt-0">
          <form onSubmit={handleLogin} className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-olive/40 uppercase tracking-widest ml-1">Work Email</label>
              <Input
                type="email"
                placeholder="name@flow.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 border-border bg-cream/50 rounded-xl focus:ring-2 focus:ring-sage/20 font-bold transition-all"
              />
            </div>
            <Button className="w-full h-11 bg-sage hover:bg-olive transition-all font-black text-xs text-cream rounded-xl shadow-lg shadow-sage/10 hover:-translate-y-px cursor-pointer" disabled={loading}>
              <Mail className="mr-2 h-4 w-4" /> {loading ? "PREPARING LINK..." : "GET MAGIC LINK"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-black text-olive/30 tracking-widest">
              <span className="bg-white px-3">or continue with</span>
            </div>
          </div>

          <Button variant="outline" className="w-full h-11 border-border hover:bg-cream font-black text-xs text-olive rounded-xl transition-all hover:-translate-y-px cursor-pointer shadow-sm" onClick={handleGoogleLogin}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
            </svg> GOOGLE IDENTITY
          </Button>
        </CardContent>
        <CardFooter className="p-8 pt-0 bg-cream/20 border-t border-border/30">
          <p className="text-center text-[9px] text-olive/40 w-full font-black uppercase tracking-widest leading-relaxed p-4">
            By entering, you accept our <br /> <a href="#" className="text-sage hover:underline">Neural Terms of Protocol</a>.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
