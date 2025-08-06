<template>
    <q-page class="bg-white">
        <div class="row bg-white border-panel bg-grey-3 full-height">
            <iframe  width="1920" height="820" style="border: none;" title="Report Section"  src="http://siel.stps.gob.mx:303/ibmcognos/cgi-bin/cognos.cgi?b_action=xts.run&m=portal/main.xts&m_redirect_windowmode=2&m_redirect=XSSSTART*2fibmcognos*2fcgi-bin*2fcognos.cgi*3fb_5faction*3dxts.run*26m*3dportal*2flaunch.xts*26ui.gateway*3dXSSSTART_2a2fibmcognos_2a2fcgi-bin_2a2fcognos.cgiXSSEND*26ui.tool*3dAnalysisStudio*26ui.action*3dedit*26launch.openJSStudioInFrame*3dtrue*26ui.object*3dXSSSTART_2a2fcontent_2a2fpackage_2a5b_2a40name_2a3d_2a27Cubo_5f5fSAT_5f5fCFDI_2a27_2a5d_2a2fanalysis_2a5b_2a40name_2a3d_2a27Cubo_2a20de_2a20SAT_5f5fCFDI_2a27_2a5dXSSEND*26ui.drillThroughTargetParameterValues*3dXSSEND" frameborder="0"></iframe>
      </div>
    </q-page>
  </template>

<script>
export default {
  name: 'CognosView'
}
</script>
<style>
 .full-height {
    height: 100vh; /* Hace que el contenedor ocupe el 100% de la altura de la ventana */
    width: 100%;
    margin: 0;
    padding: 0;
  }
</style>
