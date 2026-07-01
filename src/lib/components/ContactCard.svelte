<!--
@component ContactCard
@description Contact channels: email, phone/WhatsApp, Instagram.
-->

<script lang="ts">
	import { t } from 'svelte-i18n';
	import { Mail, Phone, Instagram, MessageCircle } from 'lucide-svelte';

	const channels = [
		{
			icon: Mail,
			labelKey: 'emailLabel',
			valueKey: 'emailAddress',
			href: 'mailto:cardenaspachecocarmenalejandra@gmail.com'
		},
		{
			icon: Phone,
			labelKey: 'phoneNumberLabel',
			valueKey: 'phoneNumber',
			href: 'https://wa.me/34628672368'
		},
		{
			icon: MessageCircle,
			labelKey: 'whatsapp',
			valueKey: 'phoneNumber',
			href: 'https://wa.me/34628672368'
		},
		{
			icon: Instagram,
			labelKey: 'instagramLabel',
			valueKey: 'instagram',
			href: 'https://instagram.com/cardenas.pacheco'
		}
	];
</script>

<div class="rounded-2xl border border-border bg-card p-6 md:p-8">
	<h2 class="mb-6 font-serif text-xl text-card-foreground">{$t('contactInfo')}</h2>

	<ul class="space-y-5">
		{#each channels as channel (channel.labelKey)}
			<li>
				<a
					href={channel.href}
					target={channel.href.startsWith('http') ? '_blank' : undefined}
					rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined}
					class="group flex items-center gap-4 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
				>
					<span
						class="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border text-primary transition-colors duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
					>
						<channel.icon class="size-5" />
					</span>
					<span class="min-w-0">
						<span class="block text-xs tracking-wide text-muted-foreground uppercase">
							{$t(channel.labelKey, { default: 'Instagram' })}
						</span>
						<span
							class="block truncate font-medium text-card-foreground transition-colors duration-200 group-hover:text-primary"
						>
							{$t(channel.valueKey)}
						</span>
					</span>
				</a>
			</li>
		{/each}
	</ul>
</div>
