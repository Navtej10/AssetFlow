"use client";

import { useActionState } from "react";
import { authenticate } from "@/actions/auth";
import { ArrowRight, Package } from "lucide-react";

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-foreground/20 blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-md p-8 glass rounded-2xl shadow-xl relative z-10 animate-fade-in border border-border bg-card/80">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary to-accent-foreground flex items-center justify-center text-white mb-4 shadow-lg">
            <Package className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome to AssetFlow</h1>
          <p className="text-muted-foreground text-sm mt-1">Enterprise Asset Management</p>
        </div>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="kushal@assetflow.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          {errorMessage && (
            <div className="p-3 bg-error/10 border border-error/20 rounded-lg text-error text-sm font-medium text-center">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-md mt-4 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {isPending ? "Signing in..." : "Sign In"}
            {!isPending && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground mb-2">Demo Credentials:</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-muted p-2 rounded-md">
              <span className="font-semibold block text-foreground">Admin (Kushal Joshi)</span>
              kushal@assetflow.com<br/>password
            </div>
            <div className="bg-muted p-2 rounded-md">
              <span className="font-semibold block text-foreground">Employee</span>
              john@assetflow.com<br/>password
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
