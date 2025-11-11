<?php
/**
 * Block Patterns for Simple Collapse
 *
 * @package Tomatillo_Design_Simple_Collapse
 * @since 1.1.0
 */

// Register FAQ Pattern
register_block_pattern(
	'tomatillo-design-simple-collapse/faq-pattern',
	array(
		'title'       => __( 'FAQ Accordion', 'tomatillo-design-simple-collapse' ),
		'description' => __( 'A frequently asked questions section with multiple collapsible panels.', 'tomatillo-design-simple-collapse' ),
		'content'     => '<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:heading -->
<h2>' . __( 'Frequently Asked Questions', 'tomatillo-design-simple-collapse' ) . '</h2>
<!-- /wp:heading -->

<!-- wp:tomatillo-design/simple-collapse {"panelTitle":"' . __( 'Question 1', 'tomatillo-design-simple-collapse' ) . '","iconType":"plus","iconAnimation":"rotate","defaultOpen":false} -->
<!-- wp:paragraph -->
<p>' . __( 'Answer to question 1 goes here.', 'tomatillo-design-simple-collapse' ) . '</p>
<!-- /wp:paragraph -->
<!-- /wp:tomatillo-design/simple-collapse -->

<!-- wp:tomatillo-design/simple-collapse {"panelTitle":"' . __( 'Question 2', 'tomatillo-design-simple-collapse' ) . '","iconType":"plus","iconAnimation":"rotate","defaultOpen":false} -->
<!-- wp:paragraph -->
<p>' . __( 'Answer to question 2 goes here.', 'tomatillo-design-simple-collapse' ) . '</p>
<!-- /wp:paragraph -->
<!-- /wp:tomatillo-design/simple-collapse -->

<!-- wp:tomatillo-design/simple-collapse {"panelTitle":"' . __( 'Question 3', 'tomatillo-design-simple-collapse' ) . '","iconType":"plus","iconAnimation":"rotate","defaultOpen":false} -->
<!-- wp:paragraph -->
<p>' . __( 'Answer to question 3 goes here.', 'tomatillo-design-simple-collapse' ) . '</p>
<!-- /wp:paragraph -->
<!-- /wp:tomatillo-design/simple-collapse -->
</div>
<!-- /wp:group -->',
		'categories'  => array( 'featured', 'text' ),
	)
);

// Register Product Details Pattern
register_block_pattern(
	'tomatillo-design-simple-collapse/product-details',
	array(
		'title'       => __( 'Product Details Accordion', 'tomatillo-design-simple-collapse' ),
		'description' => __( 'A product information section with expandable details.', 'tomatillo-design-simple-collapse' ),
		'content'     => '<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:tomatillo-design/simple-collapse {"panelTitle":"' . __( 'Specifications', 'tomatillo-design-simple-collapse' ) . '","iconType":"arrow","defaultOpen":false,"borderRadius":"4px"} -->
<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>' . __( 'Feature 1', 'tomatillo-design-simple-collapse' ) . '</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>' . __( 'Feature 2', 'tomatillo-design-simple-collapse' ) . '</li>
<!-- /wp:list-item -->
</ul>
<!-- /wp:list -->
<!-- /wp:tomatillo-design/simple-collapse -->

<!-- wp:tomatillo-design/simple-collapse {"panelTitle":"' . __( 'Shipping Information', 'tomatillo-design-simple-collapse' ) . '","iconType":"arrow","defaultOpen":false,"borderRadius":"4px"} -->
<!-- wp:paragraph -->
<p>' . __( 'Shipping details go here.', 'tomatillo-design-simple-collapse' ) . '</p>
<!-- /wp:paragraph -->
<!-- /wp:tomatillo-design/simple-collapse -->
</div>
<!-- /wp:group -->',
		'categories'  => array( 'featured' ),
	)
);

// Register Help Documentation Pattern
register_block_pattern(
	'tomatillo-design-simple-collapse/help-documentation',
	array(
		'title'       => __( 'Help Documentation', 'tomatillo-design-simple-collapse' ),
		'description' => __( 'A help section with collapsible documentation topics.', 'tomatillo-design-simple-collapse' ),
		'content'     => '<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group"><!-- wp:heading -->
<h2>' . __( 'Help & Documentation', 'tomatillo-design-simple-collapse' ) . '</h2>
<!-- /wp:heading -->

<!-- wp:tomatillo-design/simple-collapse {"panelTitle":"' . __( 'Getting Started', 'tomatillo-design-simple-collapse' ) . '","iconType":"chevron","defaultOpen":false} -->
<!-- wp:paragraph -->
<p>' . __( 'Getting started guide content.', 'tomatillo-design-simple-collapse' ) . '</p>
<!-- /wp:paragraph -->
<!-- /wp:tomatillo-design/simple-collapse -->

<!-- wp:tomatillo-design/simple-collapse {"panelTitle":"' . __( 'Advanced Features', 'tomatillo-design-simple-collapse' ) . '","iconType":"chevron","defaultOpen":false} -->
<!-- wp:paragraph -->
<p>' . __( 'Advanced features documentation.', 'tomatillo-design-simple-collapse' ) . '</p>
<!-- /wp:paragraph -->
<!-- /wp:tomatillo-design/simple-collapse -->
</div>
<!-- /wp:group -->',
		'categories'  => array( 'text' ),
	)
);

