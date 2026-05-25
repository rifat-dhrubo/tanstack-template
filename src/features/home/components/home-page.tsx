import { Link } from '@tanstack/react-router';
import {
	Braces,
	Database,
	ExternalLink,
	Paintbrush,
	Router,
	Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import * as m from '@/paraglide/messages';

function useStackFeatures() {
	return [
		{
			icon: Router,
			title: m.home_feature_router_title(),
			description: m.home_feature_router_description(),
		},
		{
			icon: Database,
			title: m.home_feature_query_title(),
			description: m.home_feature_query_description(),
		},
		{
			icon: Braces,
			title: m.home_feature_typescript_title(),
			description: m.home_feature_typescript_description(),
		},
		{
			icon: Paintbrush,
			title: m.home_feature_shadcn_title(),
			description: m.home_feature_shadcn_description(),
		},
		{
			icon: Zap,
			title: m.home_feature_tailwind_title(),
			description: m.home_feature_tailwind_description(),
		},
	];
}

const quickLinks = [
	{ href: '/sign-in', label: m.nav_sign_in },
	{ href: '/sign-up', label: m.nav_sign_up },
];

export function HomePage() {
	const stackFeatures = useStackFeatures();

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
			{/* Navigation */}
			<nav className="border-b border-border/40 bg-background/80 backdrop-blur-sm">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex h-16 items-center justify-between">
						<div className="flex items-center space-x-2">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary">
								<Router className="h-5 w-5 text-primary-foreground" />
							</div>
							<span className="font-heading text-xl font-bold">
								{m.home_nav_title()}
							</span>
						</div>
						<div className="flex items-center space-x-1">
							{quickLinks.map((link) => (
								<Button key={link.href} asChild variant="ghost" size="sm">
									<Link to={link.href}>{link.label()}</Link>
								</Button>
							))}
						</div>
					</div>
				</div>
			</nav>

			{/* Hero */}
			<section className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8">
				<div className="mx-auto max-w-3xl text-center">
					<div className="mb-6 inline-flex items-center rounded-full border border-border/50 bg-muted/50 px-3 py-1 text-sm text-muted-foreground">
						{m.home_hero_badge()}
					</div>
					<h1 className="font-heading mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
						{m.home_hero_title_1()}
						<br />
						<span className="text-muted-foreground">
							{m.home_hero_title_2()}
						</span>
					</h1>
					<p className="mb-8 text-lg text-muted-foreground sm:text-xl">
						{m.home_hero_description()}
					</p>
					<div className="flex flex-wrap items-center justify-center gap-3">
						<Button asChild size="lg">
							<a href="https://tanstack.com" target="_blank" rel="noreferrer">
								{m.home_docs_link()}
								<ExternalLink className="ml-2 h-4 w-4" />
							</a>
						</Button>
					</div>
				</div>
			</section>

			{/* Features */}
			<section className="border-t border-border/40 bg-background/50 pt-16 pb-20 sm:pt-24 sm:pb-28">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="mx-auto mb-12 max-w-2xl text-center">
						<h2 className="font-heading mb-3 text-3xl font-bold sm:text-4xl">
							{m.home_features_title()}
						</h2>
						<p className="text-muted-foreground">
							{m.home_features_description()}
						</p>
					</div>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{stackFeatures.map((feature) => (
							<Card
								key={feature.title}
								className="border-border/50 transition-colors hover:border-border"
							>
								<CardHeader>
									<div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
										<feature.icon className="h-5 w-5 text-primary" />
									</div>
									<CardTitle>{feature.title}</CardTitle>
									<CardDescription>{feature.description}</CardDescription>
								</CardHeader>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Getting started */}
			<section className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="font-heading mb-3 text-3xl font-bold sm:text-4xl">
						{m.home_getting_started_title()}
					</h2>
					<p className="mb-8 text-muted-foreground">
						{m.home_getting_started_description()}
					</p>
					<div className="rounded-lg border border-border/50 bg-muted/30 p-4 text-left">
						<code className="block text-sm">
							<span className="text-muted-foreground">$ </span>
							git clone https://github.com/rifat-dhrubo/tanstack-template.git
						</code>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="border-t border-border/40 bg-background/80">
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
						<p className="text-sm text-muted-foreground">
							{m.home_footer_text({ ecosystem: 'TanStack ecosystem' })}
						</p>
						<div className="flex items-center space-x-4">
							<Button asChild variant="link" size="sm">
								<Link to="/sign-in">{m.nav_sign_in()}</Link>
							</Button>
							<Button asChild variant="link" size="sm">
								<Link to="/sign-up">{m.nav_sign_up()}</Link>
							</Button>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
}
