<template>
    <div style="color:white">
        <el-dialog
        title="音频降噪展示窗口"
        :visible.sync="audioNoiseReduction_show"
        width="30%"
        :modal=false

        :fullscreen=true
        :before-close="changeShow"
        >
        
            <div class="flex-container">
                <div class="select-container">
                    <span>当前选中音频：</span>
                    <el-select v-model="selectedAudioId" placeholder="请选择音频" @change="selectChanged">
                        <el-option v-for="item in audioList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
                <div class="audio-container">
                    <div class="audio-item">
                        <span class="audio-label">原始音频:</span>
                        <audio id="originalAudio" ref="originalAudioRef" @play="onPlayOriginalAudio" @pause="onPauseOriginalAudio"  controls>
                            <source :src="originalAudioSrc" type="audio/wav">
                            您的浏览器不支持音频播放。
                        </audio>
                    </div>
                    <div id="waveformOriginal"></div>
                    <div class="audio-item">
                        <span class="audio-label">降噪音频:</span>
                        <audio id="processedAudio" ref="processedAudioRef" @play="onPlayProcessedAudio" @pause="onPauseProcessedAudio" controls>
                            <source :src="processedAudioSrc" type="audio/wav">
                            您的浏览器不支持音频播放。
                        </audio>
                    </div>
                    <!-- <button @click="playPause()">播放/暂停</button> -->
                    <div id="waveformProcessed"></div>
                </div>
            </div>
            
        </el-dialog>
    </div>
</template>

<script>
import WaveSurfer from 'wavesurfer.js';

export default {
    name: "audioNoiseReduction",
    props: {
        audioNoiseReduction_show:Boolean,
        AMap:Object,
        map:Object,
    },
    data() {
        return {
            // noiseReductionFlag:true,
            audioList: [{
                value: 'audio1Name',
                label: 'audio1Name'
            }, {
                value: 'audio2Name',
                label: 'audio2Name'
            }, {
                value: 'audio3Name',
                label: 'audio3Name'
            }, 
            ],
            selectedAudioId:null,
            originalAudio: null,
            precessedAudio: null,
            originalAudioSrc: null,
            processedAudioSrc: null,
            wavesurferOriginal: null,
            originalAudioEnded: false,
            serverId: 'http://192.168.1.105:20008//'
        }
    },
    created(){
        // ------------------------------------------
        this.getAudioList();
    },
    mounted(){
        window.noise=this;
        // this.wavesurferOriginal = WaveSurfer.create({
        //     container: '#waveformOriginal',
        //     waveColor: 'violet',
        //     progressColor: 'purple'
        // });
        // this.wavesurferProcessed = WaveSurfer.create({
        //     container: '#waveformProcessed',
        //     waveColor: 'violet',
        //     progressColor: 'purple'
        // });
    },
    methods:{
        changeShow(){
            this.$parent.showAudioNoiseReduction();
        },
        getAudioList(){
            console.log("getAudioList")
            // this.waveSurferLoad();
            this.audioList=[];
            // 拿到所有的音频，用于在下拉框中选择
            const options = {method: 'GET', url: 'http://localhost:20008//audio//list'};
            let that=this;
            this.$axios.request(options).then(function (res) {
                res.data.forEach(item=>{
                    that.audioList.push({
                        value: item["id"],
                        label: item["audio_name"]
                    })
                    // equipsTypes.push(item["objectName"]);
                })
            }).catch(function (error) {
                console.error(error);
            });
            this.waveSurferLoad();
            // console.log(this.audioList);
        },
        selectChanged(){
            // 在这里拿到了选中的音频名称，发请求去从服务器拿 originalAudio 和 precessedAudio
            console.log(this.selectedAudioId)
            this.getAudioFile()
            this.getAudioList()
        },
        getAudioFile(){
            
            const options = {
                method: 'GET',
                url: 'http://localhost:20008//audio//getData',
                params: {id: this.selectedAudioId}
            };
            let that=this;
            this.$axios.request(options).then(function (response) {
                // console.log(response.data);
                // "source_audio": "/home/hpcn/audio/resource/sample.wav",
                // "result_audio": "/home/hpcn/audio/result/sample_out.wav",
                that.originalAudioSrc="http://localhost/audio/"+response.data["source_audio"].substring(17);
                that.processedAudioSrc="http://localhost/audio/"+response.data["result_audio"].substring(17);
                console.log(that.wavesurferOriginal)
                // that.wavesurferOriginal.load(that.originalAudioSrc);
                // that.wavesurferProcessed.load(that.processedAudioSrc);
                that.$refs.originalAudioRef.load()
                that.$refs.processedAudioRef.load()
                console.log(that.originalAudioSrc)
                console.log(that.processedAudioSrc)
                that.waveSurferLoad()
            }).catch(function (error) {
                console.error(error);
            });
        },
        waveSurferLoad(){
            console.log("waveSurferLoad()")
            document.getElementsByClassName('audio-noise-reduction')[0].style.height= '45%';
            document.getElementsByClassName('audio-noise-reduction')[0].style.top= '40%';
            if(this.wavesurferOriginal==null){
                this.wavesurferOriginal = WaveSurfer.create({
                    container: '#waveformOriginal',
                    waveColor: 'violet',
                    progressColor: 'purple',
                });
            }
            if(this.wavesurferProcessed==null){
                this.wavesurferProcessed = WaveSurfer.create({
                    container: '#waveformProcessed',
                    waveColor: 'violet',
                    progressColor: 'purple',
                });
            }
            
            
            this.wavesurferOriginal.load(this.originalAudioSrc);
            this.wavesurferProcessed.load(this.processedAudioSrc);
            // this.originalAudioSrc='http://localhost/audio/resource/audio.wav';
            // this.processedAudioSrc='http://localhost/audio/result/audio.wav';
            // this.$refs.originalAudioRef.load()
            // this.$refs.processedAudioRef.load()
        },
        playPause() {
            this.wavesurferOriginal.playPause();
        },
        onPlayOriginalAudio(){
            this.wavesurferOriginal.playPause();
        },
        onPauseOriginalAudio(){
            const audio = this.$refs.originalAudioRef;
            if (audio && audio.currentTime === audio.duration) {
                // 音频播放完毕
                // console.log("原始音频播放结束");
            } else {
                // 用户主动暂停
                this.wavesurferOriginal.playPause();
            }
        },
        onOriginalAudioEnded(){
            // console.log("originalAudioEnd()");
            // this.originalAudioEnded=true;
        },
        onPlayProcessedAudio(){
            this.wavesurferProcessed.playPause();
        },
        onPauseProcessedAudio(){
            // this.wavesurferProcessed.playPause();
            const audio1 = this.$refs.processedAudioRef;
            if (audio1 && audio1.currentTime === audio1.duration) {
                // 音频播放完毕
                // console.log("原始音频播放结束");
            } else {
                // 用户主动暂停
                this.wavesurferProcessed.playPause();
            }
        },
    }
}
</script>
<style scoped>
.flex-container {
    display: flex;
    flex-direction: column; /* 纵向排列 */
    align-items: center; /* 在垂直方向上居中对齐 */
}

.select-container {
    display: flex; /* 使 <span> 和 <el-select> 在此容器内横向排列 */
    align-items: center; /* 在水平方向上居中对齐 */
}

.audio-container {
    margin-top: 30px;
    display: block;
}
.audio-item {
    display: flex;
    align-items: center; /* 保证文本和音频播放器水平对齐 */
    margin-bottom: 10px; /* 如果需要，可以在音频项之间增加一些间隔 */
}

.audio-label {
    margin-right: 10px; /* 文本和音频播放器之间的间隔 */
}
</style>