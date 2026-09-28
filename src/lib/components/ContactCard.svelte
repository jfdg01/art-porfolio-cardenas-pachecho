<!--
@component ContactCard
@description The direct Contact Channels: email, WhatsApp and Instagram.
-->

<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { Mail, MessageCircle, Instagram } from 'lucide-svelte';
	import { CHANNELS } from '$lib';

	const channels = [
		{ icon: Mail, label: m.email(), text: CHANNELS.email, href: `mailto:${CHANNELS.email}` },
		{ icon: MessageCircle, label: 'WhatsApp', text: CHANNELS.phone, href: CHANNELS.whatsapp },
		{
			icon: Instagram,
			label: 'Instagram',
			text: `@${CHANNELS.instagram}`,
			href: `https://instagram.com/${CHANNELS.instagram}`
		}
	];
</script>

<section aria-labelledby="channels">
	<h2 id="channels">{m.contactInfo()}</h2>
	<ul>
		{#each channels as { icon: Icon, label, text, href } (href)}
			<li>
				<Icon aria-hidden="true" />
				<span>
					<span class="label">{label}</span>
					<a {href}>{text}</a>
				</span>
			</li>
		{/each}
	</ul>
</section>

<style>
	section {
		font-family: var(--font-sans);
	}
	h2 {
		margin: 0 0 1.25rem;
		font: 400 1.5rem/1.3 var(--font-serif);
	}
	ul {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	li {
		display: flex;
		gap: 0.875rem;
		align-items: start;
	}
	li > :global(svg) {
		flex: none;
	}
	li > span {
		display: flex;
		flex-direction: column;
		min-width: 0;
	}
	.label {
		color: var(--color-muted-foreground);
	}
	a {
		display: inline-flex;
		align-items: center;
		min-height: 44px;
		color: var(--color-foreground);
		font-size: 1.125rem;
		overflow-wrap: anywhere;
	}
</style>
