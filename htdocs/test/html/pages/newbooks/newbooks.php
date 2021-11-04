<?php 
include (THEPAGESPATH.'/includes/searchdiv.php');
?>
<div class="spacer"></div>

<div id="infor">
	<div class="col_title">
		<span class="bread" id="index_" onmousedown="goToLocation(this.id)">Главная</span> / 
		<span class="caption">Новые поступления</span>
	</div>
	<div class="col_content">
		<div class="col_content"><input class="url bgblue mt20x" value="Обновить" onmousedown="callNewbooks('9');" type="button"/>
			<div class="table mt20x h100 w100">
				<div class="row">
					<div class="td content">
						<div id="newbooks" class="ml5 mr5">
							<?php 
							include (THEPAGESPATH.'/index/_news/newbooks.html');
							?>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="spacer"></div>
<?php 
include (THEPAGESPATH.'/includes/footer.php');
?>

