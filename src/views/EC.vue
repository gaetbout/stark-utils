<template>
  <div class="card bg-secondary shadow border-0">
    <div class="card-header text-center">
      <h2>Signature &nbsp;&nbsp; <fa-icon icon="fa-solid fa-bezier-curve" /></h2>
    </div>
    <div class="card-body px-lg-5">
      <div class="ec-util">
        <ul v-if="!generated" class="list-group text-center">
          <li class="list-group-item">
            <button class="btn btn-sm btn-success" @click="getTestKeys">
              gen key pair
            </button>
          </li>
        </ul>
        <ul v-else class="list-group">
          <li class="list-group-item">
            Private:
            <CopyComponent :valueToCopy="privateKey" :inFormat="false" />
          </li>
          <li class="list-group-item">
            Public X:
            <CopyComponent :valueToCopy="publicKeyX" :inFormat="false" />
          </li>
        </ul>
        <div>
          <br />
          Pedersen Hash:
          <div class="d-flex container-fluid">
            <input v-model="hash1" type="text" class="form-control formy my-3 mr-2 text-center shadow"
              placeholder="input 1..." />
            <input v-model="hash2" type="text" class="form-control formy my-3 ml-2 text-center shadow"
              placeholder="input 2..." />
          </div>
          <br />
          Hash Out:
          <CopyComponent :valueToCopy="hashOut" :inFormat="false" />
          <br />
          <br />
          Signature:
          <div class="d-flex container-fluid" style="align-items: center">
            <input v-model="hashData" type="text" class="form-control formy my-3 mr-2 text-center shadow"
              placeholder="data" />
            <input v-model="pk" type="text" class="form-control formy my-3 ml-2 text-center shadow"
              placeholder="private key" />
            <button class="ml-3 btn btn-sm btn-success" style="height: 2rem" @click="sig">
              <fa-icon icon="fa-solid fa-paper-plane" size="lg" />
            </button>
          </div>
          <br />
          Sig Out:
          <ul class="list-group">
            <li class="list-group-item">
              r:
              <div v-if="sigR" class="btn btn-sm btn-outline-success">
                {{ sigR }}
              </div>
            </li>
            <li class="list-group-item">
              s:
              <div v-if="sigS" class="btn btn-sm btn-outline-success">
                {{ sigS }}
              </div>
            </li>
          </ul>
          <br />
          Verify:
          <div class="d-flex container-fluid">
            <input v-model="hashData" type="text" class="form-control formy my-3 mr-2 text-center shadow"
              placeholder="data" />
            <input v-model="pubX" type="text" class="form-control formy my-3 ml-2 text-center shadow"
              placeholder="pub" />
          </div>
          <div class="d-flex container-fluid">
            <input v-model="sigR" type="text" class="form-control formy my-3 mr-2 text-center shadow"
              placeholder="sigR" />
            <input v-model="sigS" type="text" class="form-control formy my-3 ml-2 text-center shadow"
              placeholder="sigS" />
          </div>
          <div class="text-center">
            <button v-if="!sigChecked" class="btn btn-info" @click="checkSig">
              is_valid?
            </button>
            <div v-else>
              <button v-if="sigValid" class="btn" @click="checkSig">
                sig valid
              </button>
              <div v-else class="btn btn-danger" @click="checkSig">
                sig invalid
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { hash, ec } from "starknet";
import utils from "@/utils";
import CopyComponent from "@/components/CopyComponent";

export default {
  components: {
    CopyComponent,
  },
  data() {
    return {
      hash1: "",
      hash2: "",
      hashData: "",
      pk: "",
      pubX: "",
      sigR: "",
      sigS: "",
      sigValid: false,
      sigChecked: false,
      generated: false,
    };
  },
  computed: {
    ...mapGetters("stark", ["privateKey", "publicKeyX", "publicKeyY"]),
    hashOut() {
      const h1 = utils.toHex(this.hash1);
      const h2 = utils.toHex(this.hash2);
      const out = hash.pedersen([h1, h2]);
      return out;
    },
  },
  methods: {
    async copy(text) {
      await navigator.clipboard.writeText(text);
    },
    sig() {
      if (!this.privateKey) return;
      if (!this.hashData) return;
      const keyPair = ec.getKeyPair(this.privateKey);
      const sig = ec.sign(keyPair, this.hashData);
      if (sig.length == 2) {
        this.sigR = sig[0].toString();
        this.sigS = sig[1].toString();
      }
    },
    async checkSig() {
      const resp = await fetch(
        "https://anon.jibe.buzz/v1/ycoordinate/" + this.pubX
      );
      if (resp.ok) {
        const responseData = await resp.json();
        let keyPair = ec.ec.keyFromPublic({
          x: utils.toBN(this.pubX),
          y: utils.toBN(responseData.message),
        });
        this.sigValid = ec.verify(keyPair, this.hashData, [
          this.sigR,
          this.sigS,
        ]);
        if (!this.sigValid) {
          keyPair = ec.ec.keyFromPublic({
            x: utils.toBN(this.pubX),
            y: utils.toBN(responseData.message2),
          });
          this.sigValid = ec.verify(keyPair, this.hashData, [
            this.sigR,
            this.sigS,
          ]);
        }
      }

      this.sigChecked = true;
    },
    getTestKeys() {
      this.$store.dispatch("stark/getStarkKey");
      this.generated = true;
    },
  },
};
</script>

<style>

</style>
