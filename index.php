<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>Drag'n'Drop folder tree</title>
	<link rel="stylesheet" href="src/main.css">
</head>
<body>
	<!-- https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API -->
	<!-- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Drag_operations#droptargets -->

	<article>

		<header>Layers</header>

		<ul class="js-layers nested-list list-reset">
			<li droppable id="1">
				<label for="layer-state-1">Layer 1</label>
				<input type="checkbox" id="layer-state-1" checked/>

				<ul class="nested-list list-reset">
					<li droppable id="1-1">
						<label for="layer-state-2">Layer 2</label>
						<input type="checkbox" id="layer-state-2" checked/>

						<ul class="nested-list list-reset">
							<li draggable="true" droppable id="1-1-1">Element 1</li>
							<li draggable="true" droppable id="1-1-2">Element 2</li>
							<li draggable="true" droppable id="1-1-3">Element 3</li>
							<li draggable="true" droppable id="1-1-4">Element 4</li>
						</ul>
					</li>

					<li droppable id="1-2">
						<label for="layer-state-3">Layer 3</label>
						<input type="checkbox" id="layer-state-3" checked/>

						<ul class="nested-list list-reset">
							<li draggable="true" droppable id="1-2-5">Element 5</li>
							<!-- <li draggable="true" droppable id="1-2-6">Element 6</li>
							<li draggable="true" droppable id="1-2-7">Element 7</li>
							<li draggable="true" droppable id="1-2-8">Element 8</li> -->
						</ul>
					</li>
				</ul>
			</li>
		</ul>

	</article>

	<br /><br />

	<div droppable>hello world</div>

	<br /><br />

	<div class="log"></div>

	<!-- <script src="../../_core/assets/js/lib/jquery.min.js"></script> -->
	<script src="dist/main.js"></script>
</body>
</html>