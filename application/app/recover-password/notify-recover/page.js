"use client";
import { AnimatePresence } from "framer-motion";
import { Spotlight } from "@/components/ui/spotlight-new";

export default function HomeRecoveryPassword() {
	return (
		<div className="h-screen w-full rounded-md bg-dark-1 relative overflow-hidden">
			<div className="absolute inset-0 z-10">
				<Spotlight />
			</div>

			<div className="w-full min-h-screen flex items-center relative z-30">
				<div className="container mx-auto px-4 md:px-6 lg:px-8">
					<AnimatePresence mode="wait">
						<div className="flex items-center justify-center min-h-screen">
							<div className="border-y-4 border-green-800 p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
								<svg
									className="mx-auto mb-4 text-green-500 w-16 h-16"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
									viewBox="0 0 24 24"
								>
									<path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
								</svg>
								<h2 className="text-2xl font-semibold mb-2">¡Correo enviado!</h2>
								<p className="text-gray-500 mt-4">
									Hemos enviado un enlace a tu correo electrónico para restablecer tu contraseña.
									Revisa tu bandeja de entrada.
								</p>
							</div>
						</div>
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}
