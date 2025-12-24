"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Bot, Lock, User, LifeBuoy, Eye, EyeOff, ShieldCheck, DatabaseZap, Loader2 } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("password");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                username,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid username or password");
                setIsLoading(false);
            } else {
                router.push("/admin");
                router.refresh();
            }
        } catch (err) {
            setError("An unexpected error occurred");
            setIsLoading(false);
        }
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] as any, // Custom ease-out expo
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
            {/* Professional Mesh Gradient Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] bg-primary/10 rounded-full blur-[120px] animate-pulse opacity-40" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[100px] animate-pulse opacity-30" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md relative z-10"
            >
                {/* Brand Logo Section */}
                <motion.div variants={itemVariants} className="flex flex-col items-center mb-10">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-110" />
                        <div className="w-20 h-20 bg-card border border-primary/20 rounded-[2rem] flex items-center justify-center shadow-2xl relative z-10 rotate-12 hover:rotate-0 transition-transform duration-500">
                            <ShieldCheck className="w-12 h-12 text-primary" />
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg transform -rotate-12">
                            <DatabaseZap className="w-6 h-6 text-primary-foreground" />
                        </div>
                    </div>
                    <h1 className="mt-6 text-3xl font-black tracking-tight font-serif italic text-foreground">
                        Yassine<span className="text-primary italic font-serif">.</span>Admin
                    </h1>
                </motion.div>

                <Card className="border-primary/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] backdrop-blur-xl bg-card/40 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />

                    <CardHeader className="space-y-2 pt-8">
                        <motion.div variants={itemVariants}>
                            <CardTitle className="text-3xl font-bold text-center tracking-tight">Welcome Back</CardTitle>
                            <CardDescription className="text-center text-muted-foreground/80 font-medium mt-1">
                                Secure access to your digital command center.
                            </CardDescription>
                        </motion.div>
                    </CardHeader>

                    <CardContent className="pb-8">
                        <form onSubmit={handleLogin} className="space-y-5">
                            <motion.div variants={itemVariants} className="space-y-2.5">
                                <Label htmlFor="username" className="text-sm font-semibold ml-1">Username</Label>
                                <div className="relative group/input">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within/input:text-primary">
                                        <User className="w-full h-full" />
                                    </div>
                                    <Input
                                        id="username"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="pl-10 h-12 bg-background/50 border-primary/10 focus-visible:ring-primary/20 transition-all rounded-xl"
                                        required
                                    />
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="space-y-2.5">
                                <Label htmlFor="password" className="text-sm font-semibold ml-1">Password</Label>
                                <div className="relative group/input">
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within/input:text-primary">
                                        <Lock className="w-full h-full" />
                                    </div>
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="pl-10 pr-10 h-12 bg-background/50 border-primary/10 focus-visible:ring-primary/20 transition-all rounded-xl"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </motion.div>

                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="flex items-center gap-2 text-sm font-semibold text-destructive justify-center bg-destructive/10 py-2.5 rounded-lg border border-destructive/20"
                                    >
                                        <Bot className="w-4 h-4" />
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.div variants={itemVariants} className="pt-2">
                                <Button
                                    type="submit"
                                    className="w-full h-12 text-base font-bold rounded-xl bg-primary/90 hover:bg-primary text-primary-foreground shadow-glow-primary/30 hover:shadow-glow transition-all duration-300 border border-primary/20"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Authenticating...
                                        </div>
                                    ) : (
                                        "Enter Dashboard"
                                    )}
                                </Button>
                            </motion.div>
                        </form>
                    </CardContent>

                    <CardFooter className="flex justify-center border-t border-primary/5 py-6 bg-muted/20 flex-col gap-2 relative">
                        <motion.div variants={itemVariants} className="flex items-center gap-2 text-muted-foreground/60 text-[10px] uppercase font-bold tracking-widest">
                            <ShieldCheck className="w-3 h-3 text-primary/50" />
                            Security Protocol Active
                        </motion.div>
                        <motion.div variants={itemVariants} className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full text-[10px] text-primary font-black border border-primary/20 shadow-sm">
                            <LifeBuoy className="w-3 h-3" />
                            DEV CREDENTIALS: admin / password
                        </motion.div>
                    </CardFooter>
                </Card>

                {/* Footer Links */}
                <motion.div variants={itemVariants} className="mt-8 text-center text-xs text-muted-foreground/50">
                    &copy; {new Date().getFullYear()} Yassine. All rights reserved. Secure access only.
                </motion.div>
            </motion.div>
        </div>
    );
}
