<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" encoding="utf-8"/>

<xsl:template name="commonRequestPart">
<xsl:param name="addId"/>
<tr>
	<td class="reader_id_td">
		<span class="smalltext">Штрихкод читателя: </span>
		<span id="reader_id_span_{$addId}_{position()}" class="bold_text"><xsl:value-of select="//code"/></span>
	</td>

       <!--td class="reader_id_td">
		<span class="smalltext">Категория: </span>
                <span id="idUser_{position()}"><xsl:value-of select="FD"/></span>
       </td>

<xsl:template name="fd">
<xsl:for-each select="reader/entry">
        <xsl:if test="substring-before(.,':')='FD'">Категория читателя: <xsl:value-of select="substring-after(.,':')"/></xsl:if>
</xsl:for-each>
</xsl:template-->


</tr>
<tr>
	<td style="text-align:center;">
		<br/>
		<span class="smalltext">(номер заказа)</span>
	</td>
</tr>
<tr>
	<td>
		<table>
			<tr>
				<td class="order_location_td">
					<span id="order_location_span_{$addId}_{position()}" class="underline_text"><xsl:value-of select="//place"/></span>
					<br/>
					<span class="smalltext">(место выдачи заказа)</span>
				</td>
                <td class="order_db"><xsl:value-of select="../@iddb"/>
				<br/>
					<span class="smalltext">(база данных)</span>
				</td>
				<td class="order_type">
					<span class="underline_text">ПЕРЕДАТЬ</span>
					<br/>
					<span class="smalltext">(тип заказа)</span>
				</td>
			</tr>
		</table>
	</td>
</tr>
<tr>
	<td>
		ФИО читателя: <span id="last_name_span_{$addId}_{position()}" class="bold_text"><xsl:value-of select="//fio"/></span>
	</td>
<tr>
	<td class="reader_id_td">
		<span class="smalltext">Номер чит. билета: </span>
		<span id="reader_id_span_{$addId}_{position()}" class="bold_text"/>
	</td>
</tr>

</tr>
<tr>
	<td>
		<table>
			<tr>
				<td colspan="2" class="record_code">
				<!--td class="record_code"-->
					<span class="bold_text underline_text">
						<xsl:value-of select="entry[position()=1]"/>
					</span>
					<br/>
					<span class="smalltext">(шифр)</span>
				</td>
				<td rowspan="3" class="record_info">
					<span class="underline_text bold_text">
						<xsl:value-of select="entry[position()=4]"/>
					</span>
					<br/>
					<span class="smalltext">(инв. номера)</span>
				</td>
			</tr>
			<tr>
				<td class="record_info">
					<span class="underline_text bold_text">
						<xsl:value-of select="entry[position()=2]"/>
					</span>
					<br/>
					<span class="smalltext">(авт.знак)</span>
				</td>
				<!--td class="record_infom">
					<span class="underline_text">
						<xsl:value-of select="entry[position()=3]"/>
					</span>
					<br/>
					<span class="smalltext">(место)</span>
				</td-->
			</tr>
                        <tr>
                    <td colspan="2" class="record_code">
					<span class="underline_text">
						<xsl:value-of select="entry[position()=3]"/></span>
						<br/>
						<span class="smalltext">(место)</span>
					</td>
                        </tr>
		</table>
	</td>
</tr>
<tr>
	<td>
		<table>
			<tr>
				<td colspan="2">
					<span class="underline_text">Автор:</span>
					 
					<span class="bold_text">
						<xsl:value-of select="entry[position()=5]"/>
					</span>
				</td>
			</tr>
			<tr>
				<td colspan="2" class="record_title">
					<span class="bold_text">
						<xsl:value-of select="entry[position()=6]"/>
					</span>
					<br/>
					<span class="smalltext">(название книги, журнала)</span>
				</td>
			</tr>
			<tr>
				<td class="print_data1">
					<span class="smalltext">Место и год издания</span> 
					<span class="underline_text">
						<xsl:value-of select="entry[position()=11]"/>
						 
						<xsl:value-of select="entry[position()=7]"/>
					</span>
					<br/>
					<span class="smalltext">Язык издания</span> 
					<span class="underline_text">
						<xsl:value-of select="entry[position()=12]"/>
					</span>
				</td>
				<td class="print_data">
					<span class="smalltext">Том, часть, выпуск </span>
					<span class="underline_text bold_text">
						<xsl:if test="entry[position()=8] and string-length(entry[position()=8])">
							<xsl:value-of select="entry[position()=8]"/>
							 
						</xsl:if>
						<xsl:value-of select="entry[position()=9]"/>
					</span>
					<br/>
					<span class="smalltext">стр.</span>
						 
						<span class="underline_text">
						<xsl:value-of select="entry[position()=10]"/>
					</span>
				</td>
			</tr>
			<tr>
				<td class="print_data">
					<span class="underline_text bold_text" id="recieve_date_{$addId}_{position()}"><xsl:value-of select="//time"/></span>
					<br/>
					<span class="smalltext">(время печати)</span>
				</td>
				<td class="print_data">
					<span class="underline_text bold_text" id="date_{$addId}_{position()}"><xsl:value-of select="//date"/></span>
					<br/>
					<span class="smalltext">(дата печати)</span>
				</td>
			</tr>
			<tr>
				<td class="print_data">
					<span class="bold_text">
						<xsl:value-of select="entry[position()=13]"/>
					</span>
					<br/>
				</td>
			</tr>

		</table>
	</td>
</tr>
</xsl:template>


<xsl:template match="/">
	<html>
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
			<meta http-equiv="cache-control" content="no-cache"/>
			<meta http-equiv="Content-Script-Type" content="text/javascript" />
			<title>Печать требований</title>
			<style type="text/css">
			@media screen
			{
				body
				{
					background:#fff;
				}
				.body
				{
					height:<xsl:value-of select="//height"/>px;
					overflow:auto;
				}
			}
			@media screen,print
			{
				*
				{
					padding:0;
					margin:0;
					font-size:x-large;
					_font-size:large;

				}
				body
				{
					padding:1em;
					background:#fff;
				}
				table
				{
					margin:0;
					padding:0;
					border-collapse:collapse;
					table-layout:fixed;
				}
				td
				{
					border-color:#000;
					border-width:1px;
				}
				table table
				{
					width:100%;
				}
				table table td
				{
					padding-left:1px;
				}
				.smalltext
				{
					font-size:x-large;
					_font-size:large;
				}
				.bold_text
				{
					font-weight:bold;
				}
				.underline_text
				{
					text-decoration:underline;
				}
				#data_table
				{
					width:110mm;
					border-style:none;
				}
				.dotted_line
				{
					border-bottom-style:dotted;
					border-color:#ccc;
				}
				.reader_id_td
				{
					border-bottom-style:solid;
					text-align:center;
				}
				.order_location_td
				{
					width:35%;
					border-style:solid;
				}
				.order_type
				{
					width:45%;
					border-style:solid;
				}
				.order_db
				{
					width:20%;
					border-style:solid;
				}
				.record_code
				{
					width:65%;
					border-style:solid;
				}
				.record_info
				{
					width:35%;
					border-style:solid;
				}
				.record_infoa
				{
					width:15%;  /* 35 */
					border-style:solid;
				}
				.record_infom
				{
					width:40%;  /* 35 */
					border-style:solid;
				}
				.record_title
				{
					text-align:center;
				}
				.print_data
				{
					width:50%;
					vertical-align:top;
				}
				.print_data1
				{
					width:50%;
					vertical-align:top;
					font-weight:bold;
				}
				.add_table_td1
				{
					width:23%;
					text-align:center;
					border-style:solid;
				}
				.add_table_td2
				{
					width:18%;
					text-align:center;
					border-style:solid;
				}
				.add_table_td3
				{
					width:34%;
					text-align:center;
					border-style:solid;
				}
				.add_table_td4
				{
					width:25%;
					text-align:center;
					border-style:solid;
				}
				.next_record
				{
					page-break-before:always;
				}
				.sign
				{
					padding-top:1em;
					border-bottom-style:dotted;
				}
				.input_title
				{
					padding:0.5em;
					width:10em;
				}
			}
			</style>
		<script>
		function printOrder()
		{
			self.focus();
			self.print();
		}
		</script>
		</head>
		<body onload="printOrder()">
		<div class="body">
			<table id="data_table" cellspacing="0" cellpadding="0">
				<xsl:for-each select="//result/entry/REQUEST">
					<xsl:if test="position()!=1">
						<tr class="next_record">
							<td/>
						</tr>
							</xsl:if>
					<xsl:call-template name="commonRequestPart">
						<xsl:with-param name="addId" select="'1'"/>
					</xsl:call-template>
					<tr>
						<td>
							<table>
								<tr>
									<td class="smalltext add_table_td1">
										Нет в биб-ке
									</td>
									<td class="smalltext add_table_td2">
										Занято
									</td>
									<td class="smalltext add_table_td3">
										В переплете
									</td>
									<td class="smalltext add_table_td4">
										Нет на месте
									</td>
								</tr>
								<tr>
									<td class="add_table_td1">
										 
									</td>
									<td class="add_table_td2">
										 
									</td>
									<td class="add_table_td3">
										 
									</td>
									<td class="add_table_td4">
										 
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td class="dotted_line"><br/></td>
					</tr>
					<tr>
						<td><br/></td>
					</tr>
					<xsl:call-template name="commonRequestPart">
						<xsl:with-param name="addId" select="'2'"/>
					</xsl:call-template>
					<!--tr>
						<td class="sign">
							Подп. сотр. отд. хран.
						</td>
					</tr>
					<tr>
						<td class="sign">
							Подп. читателя
						</td>
					</tr>
                    <tr>
						<td class="sign">
							_______________________________________
						</td>
					</tr-->
				</xsl:for-each>
			</table>
		</div>
		</body>
	</html>
</xsl:template>
</xsl:stylesheet>