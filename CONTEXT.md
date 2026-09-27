# Carmen Cárdenas Pacheco — Portfolio

The public portfolio of the painter Carmen Cárdenas Pacheco. It shows her original work to people who may buy it, and it offers her online classes.

## Language

**Artist**:
Carmen Cárdenas Pacheco, the painter whose work the site shows.

**Artwork**:
One original piece by the Artist, shown with one main image and zero or more zoom images. An Artwork has no description; its Title and facts speak for it.
_Avoid_: painting, piece, obra (in code)

**Wall**:
The gallery page, styled like a museum wall: Artworks hang on a plain surface with space around them, and no boxes or cards frame them.
_Avoid_: grid, feed, cards

**Room**:
A part of the Wall that holds every Artwork with one Tag, such as "Retratos" or "Acuarela". An Artwork hangs in every Room its Tags name, so Rooms overlap. A Room is a place to walk through, not a filter to set.
_Avoid_: filter, section, category

**Label**:
The small museum-style text beside an Artwork on the Wall: Title, year, Tags, dimensions, and "Sold" when it applies.
_Avoid_: caption, card, badge

**Full View**:
An Artwork image at the original resolution of its photo, shown only when a person asks for it, so the charcoal and paint texture are visible. The gallery and the Artwork page show smaller copies.
_Avoid_: lightbox, zoom, high-res

**Available**:
An Artwork that the Artist will sell. The site never shows a price; a Buyer must send an Enquiry.
_Avoid_: in stock, for sale price

**Sold**:
An Artwork that is no longer Available. It stays in the gallery with a "sold" label.
_Avoid_: unavailable, archived

**Tag**:
A word that describes an Artwork accurately: its technique, its kind or its subject (acuarela, pintura, apunte, retrato). An Artwork has one or more Tags. Each Tag is a Room. A Tag says nothing about value or whether the Artwork is Available.
_Avoid_: category, type

**Title**:
The original name the Artist gave an Artwork. Never translated.

**Buyer**:
A person who may buy an Artwork. The primary audience of the site. Many Buyers are older people, so the site must be obvious to use without prior knowledge.
_Avoid_: collector, customer, client

**Enquiry**:
A message from a Buyer or Student to the Artist, sent through any Contact Channel. The only way to buy an Artwork or join a class.
_Avoid_: order, purchase, request

**Contact Channel**:
A way to send an Enquiry: the contact form, email, WhatsApp or Instagram. The site offers all of them and lets the person choose.

**Student**:
A person who may join the Artist's online classes. The secondary audience of the site.

**Locale**:
One of the two languages the site supports: Spanish (default) and English.

## Relationships

- An **Artwork** is **Available** or not; a **Buyer** asks about an **Available** Artwork with an **Enquiry**
- An **Artwork** is either **Available** or **Sold**
- An **Artwork** has one or more **Tags**
- Each **Tag** is one **Room**; an **Artwork** hangs in every **Room** its **Tags** name
- Each **Artwork** on the **Wall** has exactly one **Label**
- An **Enquiry** goes through exactly one **Contact Channel**
- A **Student** joins a class with an **Enquiry**
