#!/usr/bin/env nextflow

path_to_data = "/home/data"
path_to_input = "/home/data/inputs"
path_to_output = "/home/data/outputs"

log.info "B C I L   P I P E L I N E        "
log.info "================================="

order = Channel.from( 'startNanook' )

process runPoretools {
  """
  sh /home/exe.sh
  """
}

process runNanook { 
  input:
  val 'startNanook' from order

  output:
  val 'startMaftools' into maftools

  script:
  """
  export NANOOK_DIR=/nanookSource/NanoOK
  export PATH=/nanookSource/NanoOK/bin:$PATH
  sh /home/exe.sh
  """
}

process runMaftools {
  input:
  val 'startMaftools' from maftools

  script:
  """
  bash /home/exe.sh
  """
}

workflow.onComplete {
  println "Run-time: $workflow.duration"
  println "Pipeline completed at: $workflow.complete"
  println "Execution status: ${ workflow.success ? 'OK' : 'failed' }"
}
